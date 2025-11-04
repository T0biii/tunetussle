import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAlbumTracks, Track, Album, mockAlbums } from '@/lib/mockSpotifyData';
export interface Song extends Track {
  score: number;
}
type AppState = 'login' | 'album-selection' | 'battle' | 'results';
interface SongState {
  songs: Song[];
  battleQueue: [Song, Song][];
  currentBattle: [Song, Song] | null;
  completedBattles: number;
  totalBattles: number;
  isAuthenticated: boolean;
  appState: AppState;
  selectedAlbum: Album | null;
  login: () => void;
  logout: () => void;
  selectAlbum: (albumId: string) => void;
  initializeSession: (tracks: Track[]) => void;
  vote: (winnerId: string | 'like_both' | 'no_opinion') => void;
  startNew: () => void;
}
const K = 32; // Elo rating K-factor
const getExpectedScore = (ratingA: number, ratingB: number) => {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
};
const updateRatings = (ratingA: number, ratingB: number, result: 'win' | 'loss' | 'tie') => {
  const expectedA = getExpectedScore(ratingA, ratingB);
  const expectedB = getExpectedScore(ratingB, ratingA);
  let scoreA, scoreB;
  if (result === 'win') {
    scoreA = 1;
    scoreB = 0;
  } else if (result === 'loss') {
    scoreA = 0;
    scoreB = 1;
  } else { // tie
    scoreA = 0.5;
    scoreB = 0.5;
  }
  const newRatingA = ratingA + K * (scoreA - expectedA);
  const newRatingB = ratingB + K * (scoreB - expectedB);
  return { newRatingA: Math.round(newRatingA), newRatingB: Math.round(newRatingB) };
};
const generateBattlePairs = (songs: Song[]): [Song, Song][] => {
  const pairs: [Song, Song][] = [];
  for (let i = 0; i < songs.length; i++) {
    for (let j = i + 1; j < songs.length; j++) {
      pairs.push([songs[i], songs[j]]);
    }
  }
  // Fisher-Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
};
const initialState = {
  songs: [],
  battleQueue: [],
  currentBattle: null,
  completedBattles: 0,
  totalBattles: 0,
  isAuthenticated: false,
  appState: 'login' as AppState,
  selectedAlbum: null,
};
export const useSongStore = create<SongState>()(
  persist(
    (set, get) => ({
      ...initialState,
      login: () => set({ isAuthenticated: true, appState: 'album-selection' }),
      logout: () => set(initialState),
      selectAlbum: (albumId: string) => {
        const tracks = getAlbumTracks(albumId);
        const album = mockAlbums.find((a) => a.id === albumId) || null;
        get().initializeSession(tracks);
        set({ appState: 'battle', selectedAlbum: album });
      },
      initializeSession: (tracks: Track[]) => {
        const songsWithScore = tracks.map((track) => ({ ...track, score: 1000 }));
        const pairs = generateBattlePairs(songsWithScore);
        set({
          songs: songsWithScore.sort((a, b) => b.score - a.score),
          battleQueue: pairs,
          totalBattles: pairs.length,
          completedBattles: 0,
          currentBattle: pairs[0] || null,
        });
      },
      vote: (winnerId) => {
        const { currentBattle, songs, battleQueue } = get();
        if (!currentBattle) return;
        let updatedSongs = songs;
        if (winnerId !== 'no_opinion') {
          const [songA, songB] = currentBattle;
          let newRatings;
          if (winnerId === 'like_both') {
            newRatings = updateRatings(songA.score, songB.score, 'tie');
          } else if (winnerId === songA.id) {
            newRatings = updateRatings(songA.score, songB.score, 'win');
          } else {
            newRatings = updateRatings(songA.score, songB.score, 'loss');
          }
          updatedSongs = songs.map((song) => {
            if (song.id === songA.id) return { ...song, score: newRatings.newRatingA };
            if (song.id === songB.id) return { ...song, score: newRatings.newRatingB };
            return song;
          }).sort((a, b) => b.score - a.score);
        }
        const newQueue = battleQueue.slice(1);
        const isSessionComplete = newQueue.length === 0;
        set({
          songs: updatedSongs,
          battleQueue: newQueue,
          currentBattle: newQueue[0] || null,
          completedBattles: get().completedBattles + 1,
          appState: isSessionComplete ? 'results' : 'battle',
        });
      },
      startNew: () => {
        set({
          appState: 'album-selection',
          songs: [],
          battleQueue: [],
          currentBattle: null,
          completedBattles: 0,
          totalBattles: 0,
          selectedAlbum: null,
        });
      },
    }),
    {
      name: 'tunetussle-song-storage',
    }
  )
);