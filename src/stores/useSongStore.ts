import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAlbumTracks, Track, Album } from '@/lib/mockSpotifyData';
export interface Song extends Track {
  score: number;
}
type AppState = 'login' | 'album-selection' | 'battle' | 'results';
interface SpotifyUser {
  display_name: string;
  id: string;
}
interface SongState {
  songs: Song[];
  battleQueue: [Song, Song][];
  currentBattle: [Song, Song] | null;
  completedBattles: number;
  totalBattles: number;
  user: SpotifyUser | null;
  isAuthLoading: boolean;
  isSearching: boolean;
  albums: Album[];
  appState: AppState;
  selectedAlbum: Album | null;
  checkAuthStatus: () => Promise<void>;
  logout: () => Promise<void>;
  searchAlbums: (query: string) => Promise<void>;
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
  user: null,
  isAuthLoading: true,
  isSearching: false,
  albums: [],
  appState: 'login' as AppState,
  selectedAlbum: null,
};
export const useSongStore = create<SongState>()(
  persist(
    (set, get) => ({
      ...initialState,
      checkAuthStatus: async () => {
        try {
          const response = await fetch('/api/spotify/me');
          const { user } = await response.json();
          set({ user, appState: user ? 'album-selection' : 'login' });
        } catch (error) {
          console.error("Auth check failed:", error);
          set({ user: null, appState: 'login' });
        } finally {
          set({ isAuthLoading: false });
        }
      },
      logout: async () => {
        await fetch('/api/spotify/logout', { method: 'POST' });
        set(initialState);
        set({ isAuthLoading: false, appState: 'login' });
      },
      searchAlbums: async (query: string) => {
        if (!query) {
          set({ albums: [] });
          return;
        }
        set({ isSearching: true });
        try {
          const response = await fetch(`/api/spotify/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          const formattedAlbums: Album[] = data.albums.items.map((item: any) => ({
            id: item.id,
            title: item.name,
            artist: item.artists.map((a: any) => a.name).join(', '),
            coverUrl: item.images[0]?.url || '',
          }));
          set({ albums: formattedAlbums });
        } catch (error) {
          console.error("Album search failed:", error);
          set({ albums: [] });
        } finally {
          set({ isSearching: false });
        }
      },
      selectAlbum: (albumId: string) => {
        const tracks = getAlbumTracks(albumId); // Still using mock tracks for now
        const album = get().albums.find((a) => a.id === albumId) || null;
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
          albums: [],
        });
      },
    }),
    {
      name: 'tunetussle-song-storage',
      partialize: (state) => ({ user: state.user }), // Only persist user data
    }
  )
);