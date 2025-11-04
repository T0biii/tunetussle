import React from 'react';
import { motion } from 'framer-motion';
import { useSongStore } from '@/stores/useSongStore';
import { RankedSongItem } from './RankedSongItem';
import { Button } from '@/components/ui/button';
import { Swords } from 'lucide-react';
export function RankingList() {
  const songs = useSongStore((state) => state.songs);
  const startNew = useSongStore((state) => state.startNew);
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-deep-purple/50 border-2 border-neon-cyan/30 rounded-xl shadow-neon-cyan/20 p-4 md:p-6 backdrop-blur-sm space-y-3"
    >
      <div className="max-h-[calc(80vh-150px)] overflow-y-auto pr-2 space-y-3">
        {songs.map((song, index) => (
          <RankedSongItem key={song.id} song={song} rank={index + 1} />
        ))}
      </div>
      <div className="pt-4 border-t border-neon-cyan/20">
        <Button
          onClick={startNew}
          className="w-full bg-neon-cyan/10 border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-deep-purple hover:shadow-neon-cyan transition-all duration-300"
        >
          <Swords className="mr-2 h-4 w-4" />
          Battle Another Album
        </Button>
      </div>
    </motion.div>
  );
}