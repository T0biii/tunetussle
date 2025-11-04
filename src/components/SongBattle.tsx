import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSongStore } from '@/stores/useSongStore';
import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';
export function SongBattle() {
  const currentBattle = useSongStore((state) => state.currentBattle);
  const vote = useSongStore((state) => state.vote);
  if (!currentBattle) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-deep-purple/50 border-2 border-neon-cyan/30 rounded-xl p-6 text-neon-cyan/70">
        <Music size={48} className="animate-pulse" />
        <p className="mt-4 text-lg">Loading next battle...</p>
      </div>
    );
  }
  const [songA, songB] = currentBattle;
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', duration: 0.5 } },
    exit: { opacity: 0, scale: 0.8, y: -50, transition: { duration: 0.2 } },
  };
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={songA.id + songB.id}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={cardVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {/* Song A Card */}
          <div className="flex flex-col items-center p-4 md:p-6 bg-deep-purple/50 border-2 border-neon-pink/30 rounded-xl shadow-neon-pink/20 backdrop-blur-sm text-center space-y-4">
            <h2 className="text-2xl font-bold text-neon-pink">{songA.title}</h2>
            <p className="text-lg text-neon-pink/80">{songA.artist}</p>
            <Button
              onClick={() => vote(songA.id)}
              className="w-full bg-neon-pink/10 border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-deep-purple hover:shadow-neon-pink transition-all duration-300"
            >
              Vote
            </Button>
          </div>
          {/* Song B Card */}
          <div className="flex flex-col items-center p-4 md:p-6 bg-deep-purple/50 border-2 border-neon-cyan/30 rounded-xl shadow-neon-cyan/20 backdrop-blur-sm text-center space-y-4">
            <h2 className="text-2xl font-bold text-neon-cyan">{songB.title}</h2>
            <p className="text-lg text-neon-cyan/80">{songB.artist}</p>
            <Button
              onClick={() => vote(songB.id)}
              className="w-full bg-neon-cyan/10 border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-deep-purple hover:shadow-neon-cyan transition-all duration-300"
            >
              Vote
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 flex justify-center">
        <Button
          onClick={() => vote('tie')}
          variant="ghost"
          className="text-neon-cyan/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          It's a Tie
        </Button>
      </div>
    </div>
  );
}