import React from 'react';
import { motion } from 'framer-motion';
import { Song } from '@/stores/useSongStore';
import { cn } from '@/lib/utils';
interface RankedSongItemProps {
  song: Song;
  rank: number;
}
export function RankedSongItem({ song, rank }: RankedSongItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, type: 'spring' }}
      className={cn(
        "flex items-center justify-between p-3 rounded-lg transition-colors duration-300",
        "bg-neon-cyan/5 border border-neon-cyan/10"
      )}
    >
      <div className="flex items-center gap-4">
        <span className={cn(
          "text-xl font-bold w-8 text-center",
          rank === 1 && "text-neon-pink",
          rank === 2 && "text-neon-cyan",
          rank === 3 && "text-white/90",
          rank > 3 && "text-neon-cyan/50"
        )}>
          {rank}
        </span>
        <div>
          <p className="font-semibold text-neon-cyan text-base">{song.title}</p>
          <p className="text-sm text-neon-cyan/70">{song.artist}</p>
        </div>
      </div>
      <div className="text-lg font-mono font-semibold text-neon-pink/80">
        {song.score}
      </div>
    </motion.div>
  );
}