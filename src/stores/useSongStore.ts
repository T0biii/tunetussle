import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export interface Song {
  id: string;
  title: string;
  artist: string;
  score: number;
}
interface SongState {
  songs: Song[];
  battleQueue: [Song, Song][];
  currentBattle: [Song, Song] | null;
  completedBattles: number;
  totalBattles: number;
  isComplete: boolean;
  initializeSession: () => void;
  vote: (winnerId: string | 'like_both' | 'no_opinion') => void;
  resetScores: () => void;
}
const initialSongs: Song[] = [
  { id: '1', title: "Smells Like Teen Spirit", artist: "Nirvana", score: 1000 },
  { id: '2', title: "One", artist: "U2", score: 1000 },
  { id: '3', title: "Billie Jean", artist: "Michael Jackson", score: 1000 },
  { id: '4', title: "Bohemian Rhapsody", artist: "Queen", score: 1000 },
  { id: '5', title: "Hey Jude", artist: "The Beatles", score: 1000 },
  { id: '6', title: "Like A Rolling Stone", artist: "Bob Dylan", score: 1000 },
  { id: '7', title: "Stairway to Heaven", artist: "Led Zeppelin", score: 1000 },
  { id: '8', title: "Wonderwall", artist: "Oasis", score: 1000 },
  { id: '9', title: "Hotel California", artist: "Eagles", score: 1000 },
  { id: '10', title: "Sweet Child O' Mine", artist: "Guns N' Roses", score: 1000 },
];
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
  // Shuffle the pairs for randomness
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
};
export const useSongStore = create<SongState>()(
  persist(
    (set, get) => ({
      songs: initialSongs.sort((a, b) => b.score - a.score),
      battleQueue: [],
      currentBattle: null,
      completedBattles: 0,
      totalBattles: 0,
      isComplete: false,
      initializeSession: () => {
        const songs = get().songs;
        const pairs = generateBattlePairs(songs);
        set({
          battleQueue: pairs,
          totalBattles: pairs.length,
          completedBattles: 0,
          isComplete: false,
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
          } else { // winnerId is songB.id
            newRatings = updateRatings(songA.score, songB.score, 'loss');
          }
          updatedSongs = songs.map(song => {
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
          isComplete: isSessionComplete,
        });
      },
      resetScores: () => {
        set({ songs: initialSongs.sort((a, b) => b.score - a.score) });
        get().initializeSession();
      },
    }),
    {
      name: 'tunetussle-song-storage',
    }
  )
);