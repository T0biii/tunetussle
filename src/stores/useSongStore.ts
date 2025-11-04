import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';
export interface Song {
  id: string;
  title: string;
  artist: string;
}
interface SongState {
  songs: Song[];
  setSongs: (songs: Song[]) => void;
  moveSong: (oldIndex: number, newIndex: number) => void;
}
const initialSongs: Song[] = [
  { id: '1', title: "Smells Like Teen Spirit", artist: "Nirvana" },
  { id: '2', title: "One", artist: "U2" },
  { id: '3', title: "Billie Jean", artist: "Michael Jackson" },
  { id: '4', title: "Bohemian Rhapsody", artist: "Queen" },
  { id: '5', title: "Hey Jude", artist: "The Beatles" },
  { id: '6', title: "Like A Rolling Stone", artist: "Bob Dylan" },
  { id: '7', title: "Stairway to Heaven", artist: "Led Zeppelin" },
  { id: '8', title: "Wonderwall", artist: "Oasis" },
  { id: '9', title: "Hotel California", artist: "Eagles" },
  { id: '10', title: "Sweet Child O' Mine", artist: "Guns N' Roses" },
];
export const useSongStore = create<SongState>((set) => ({
  songs: initialSongs,
  setSongs: (songs) => set({ songs }),
  moveSong: (oldIndex, newIndex) =>
    set((state) => ({
      songs: arrayMove(state.songs, oldIndex, newIndex),
    })),
}));