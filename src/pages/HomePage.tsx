import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSongStore } from '@/stores/useSongStore';
import { SongBattle } from '@/components/SongBattle';
import { RankingList } from '@/components/RankingList';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCw } from 'lucide-react';
export function HomePage() {
  const initializeSession = useSongStore((state) => state.initializeSession);
  const resetScores = useSongStore((state) => state.resetScores);
  const isComplete = useSongStore((state) => state.isComplete);
  const completedBattles = useSongStore((state) => state.completedBattles);
  const totalBattles = useSongStore((state) => state.totalBattles);
  const battleQueue = useSongStore((state) => state.battleQueue);
  useEffect(() => {
    // Initialize session only if the queue is empty and it's not complete.
    // This handles initial load and rehydration from persistence.
    if (battleQueue.length === 0 && !isComplete) {
      initializeSession();
    }
  }, [initializeSession, battleQueue.length, isComplete]);
  const progressValue = totalBattles > 0 ? (completedBattles / totalBattles) * 100 : 0;
  return (
    <div className="min-h-screen bg-deep-purple flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-pixel relative overflow-y-auto">
      <div className="absolute inset-0 bg-grid-neon-cyan/10 [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          <header className="text-center mb-8 relative">
            <h1
              className="text-5xl md:text-7xl font-bold text-neon-pink animate-neon-glow shadow-neon-pink"
              style={{ textShadow: '0 0 5px #ff6bed, 0 0 10px #ff6bed, 0 0 20px #ff6bed, 0 0 40px #ff6bed' }}
            >
              TuneTussle
            </h1>
            <p className="text-neon-cyan/80 mt-2 text-lg md:text-xl">
              {isComplete ? "The final rankings are in!" : "Which track reigns supreme?"}
            </p>
            <Button
              onClick={resetScores}
              variant="ghost"
              size="sm"
              className="absolute top-0 right-0 text-neon-cyan/60 hover:text-neon-cyan hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </header>
          <main>
            {isComplete ? (
              <RankingList />
            ) : (
              <div className="space-y-8">
                <SongBattle />
                <div className="space-y-2">
                  <Progress value={progressValue} className="w-full border border-neon-cyan/20" />
                  <p className="text-center text-sm text-neon-cyan/60">
                    {completedBattles} / {totalBattles} Battles
                  </p>
                </div>
              </div>
            )}
          </main>
        </motion.div>
      </div>
      <footer className="w-full text-center text-neon-cyan/40 text-sm mt-12 pb-4">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </div>
  );
}