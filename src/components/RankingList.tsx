import React from 'react';
import { motion } from 'framer-motion';
import { useSongStore } from '@/stores/useSongStore';
import { RankedSongItem } from './RankedSongItem';
export function RankingList() {
  const songs = useSongStore((state) => state.songs);
  return (
    <motion.div 
      layout
      className="bg-deep-purple/50 border-2 border-neon-cyan/30 rounded-xl shadow-neon-cyan/20 p-4 md:p-6 backdrop-blur-sm space-y-3 max-h-[80vh] overflow-y-auto"
    >
      <h2 className="text-3xl font-bold text-neon-cyan text-center mb-4">Rankings</h2>
      {songs.map((song, index) => (
        <RankedSongItem key={song.id} song={song} rank={index + 1} />
      ))}
    </motion.div>
  );
}