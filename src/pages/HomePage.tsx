import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSongStore } from '@/stores/useSongStore';
import { SongBattle } from '@/components/SongBattle';
import { RankingList } from '@/components/RankingList';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
export function HomePage() {
  const startBattle = useSongStore((state) => state.startBattle);
  const resetScores = useSongStore((state) => state.resetScores);
  useEffect(() => {
    // This check prevents starting a new battle on every load if there's already persisted data.
    // The store now handles initialization. We can call startBattle if there's no current battle.
    const unsub = useSongStore.subscribe(state => {
      if (!state.currentBattle) {
        startBattle();
      }
    });
    // Initial check
    if (!useSongStore.getState().currentBattle) {
        startBattle();
    }
    return () => unsub();
  }, [startBattle]);
  return (
    <div className="min-h-screen bg-deep-purple flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-pixel relative overflow-y-auto">
      <div className="absolute inset-0 bg-grid-neon-cyan/10 [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
          className="w-full lg:w-1/2 flex-shrink-0"
        >
          <header className="text-center mb-8 relative">
            <h1
              className="text-5xl md:text-7xl font-bold text-neon-pink animate-neon-glow shadow-neon-pink"
              style={{ textShadow: '0 0 5px #ff6bed, 0 0 10px #ff6bed, 0 0 20px #ff6bed, 0 0 40px #ff6bed' }}
            >
              TuneTussle
            </h1>
            <p className="text-neon-cyan/80 mt-2 text-lg md:text-xl">Which track reigns supreme?</p>
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
            <SongBattle />
          </main>
        </motion.div>
        <div className="w-full lg:w-1/2">
          <RankingList />
        </div>
      </div>
      <footer className="w-full text-center text-neon-cyan/40 text-sm mt-12 pb-4">
        <p>Built with ��️ at Cloudflare</p>
      </footer>
    </div>
  );
}