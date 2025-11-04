import { create } from 'zustand';
export interface Song {
  id: string;
  title: string;
  artist: string;
  score: number;
}
interface SongState {
  songs: Song[];
  currentBattle: [Song, Song] | null;
  startBattle: () => void;
  vote: (winnerId: string | 'tie') => void;
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
export const useSongStore = create<SongState>((set, get) => ({
  songs: initialSongs.sort((a, b) => b.score - a.score),
  currentBattle: null,
  startBattle: () => {
    const songs = get().songs;
    if (songs.length < 2) {
      set({ currentBattle: null });
      return;
    }
    let index1 = Math.floor(Math.random() * songs.length);
    let index2 = Math.floor(Math.random() * songs.length);
    while (index1 === index2) {
      index2 = Math.floor(Math.random() * songs.length);
    }
    set({ currentBattle: [songs[index1], songs[index2]] });
  },
  vote: (winnerId) => {
    const { currentBattle, songs } = get();
    if (!currentBattle) return;
    const [songA, songB] = currentBattle;
    let newRatings;
    if (winnerId === 'tie') {
      newRatings = updateRatings(songA.score, songB.score, 'tie');
    } else if (winnerId === songA.id) {
      newRatings = updateRatings(songA.score, songB.score, 'win');
    } else { // winnerId is songB.id
      newRatings = updateRatings(songA.score, songB.score, 'loss');
    }
    const updatedSongs = songs.map(song => {
      if (song.id === songA.id) return { ...song, score: newRatings.newRatingA };
      if (song.id === songB.id) return { ...song, score: newRatings.newRatingB };
      return song;
    }).sort((a, b) => b.score - a.score);
    set({ songs: updatedSongs });
    // Start a new battle after a short delay to allow for animations
    setTimeout(() => {
      get().startBattle();
    }, 500);
  },
}));