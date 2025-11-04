import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSongStore } from '@/stores/useSongStore';
import { SongBattle } from '@/components/SongBattle';
import { RankingList } from '@/components/RankingList';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LogOut, RefreshCw, Loader } from 'lucide-react';
import { SpotifyLogin } from '@/components/SpotifyLogin';
import { AlbumSelection } from '@/components/AlbumSelection';
import { Toaster } from '@/components/ui/sonner';
function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-deep-purple flex flex-col items-center justify-center z-50">
      <Loader className="w-16 h-16 text-neon-pink animate-spin" />
      <p className="text-neon-cyan/80 mt-4 text-lg">Verifying Session...</p>
    </div>
  );
}
export function HomePage() {
  const appState = useSongStore((state) => state.appState);
  const user = useSongStore((state) => state.user);
  const logout = useSongStore((state) => state.logout);
  const startNew = useSongStore((state) => state.startNew);
  const completedBattles = useSongStore((state) => state.completedBattles);
  const totalBattles = useSongStore((state) => state.totalBattles);
  const selectedAlbum = useSongStore((state) => state.selectedAlbum);
  const isAuthLoading = useSongStore((state) => state.isAuthLoading);
  const checkAuthStatus = useSongStore((state) => state.checkAuthStatus);
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);
  const progressValue = totalBattles > 0 ? (completedBattles / totalBattles) * 100 : 0;
  const renderHeaderContent = () => {
    if (!user) {
      return { title: "TuneTussle", subtitle: "The Ultimate Song Sorter" };
    }
    switch (appState) {
      case 'album-selection':
        return { title: "Select an Album", subtitle: `Welcome, ${user.display_name}!` };
      case 'battle':
        return { title: "TuneTussle", subtitle: "Which track reigns supreme?" };
      case 'results':
        return {
          title: "Final Rankings",
          subtitle: selectedAlbum ? `Results for ${selectedAlbum.title}` : "The people have spoken!"
        };
      default:
        return { title: "TuneTussle", subtitle: "" };
    }
  };
  const { title, subtitle } = renderHeaderContent();
  const renderContent = () => {
    if (!user) {
      return <SpotifyLogin />;
    }
    switch (appState) {
      case 'album-selection':
        return <AlbumSelection />;
      case 'battle':
        return (
          <div className="space-y-8">
            <SongBattle />
            <div className="space-y-2">
              <Progress value={progressValue} className="w-full border border-neon-cyan/20" />
              <p className="text-center text-sm text-neon-cyan/60">
                {completedBattles} / {totalBattles} Battles
              </p>
            </div>
          </div>
        );
      case 'results':
        return <RankingList />;
      default:
        return null;
    }
  };
  if (isAuthLoading) {
    return <FullPageLoader />;
  }
  return (
    <div className="min-h-screen bg-deep-purple flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-pixel relative overflow-y-auto">
      <Toaster
        theme="dark"
        toastOptions={{
          classNames: {
            toast: 'bg-deep-purple border-neon-cyan/30 text-neon-cyan',
            success: 'text-green-400',
            error: 'text-red-400',
          },
        }}
      />
      <div className="absolute inset-0 bg-grid-neon-cyan/10 [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          <header className="text-center mb-8 relative h-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={title + subtitle}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h1
                  className="text-5xl md:text-7xl font-bold text-neon-pink animate-neon-glow shadow-neon-pink"
                  style={{ textShadow: '0 0 5px #ff6bed, 0 0 10px #ff6bed, 0 0 20px #ff6bed, 0 0 40px #ff6bed' }}
                >
                  {title}
                </h1>
                <p className="text-neon-cyan/80 mt-2 text-lg md:text-xl">{subtitle}</p>
              </motion.div>
            </AnimatePresence>
            {user && (
              <div className="absolute top-0 right-0 flex gap-2">
                {appState === 'results' && (
                  <Button
                    onClick={startNew}
                    variant="ghost"
                    size="sm"
                    className="text-neon-cyan/60 hover:text-neon-cyan hover:bg-white/10"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    New
                  </Button>
                )}
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="text-neon-cyan/60 hover:text-neon-cyan hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </header>
          <main>
            <AnimatePresence mode="wait">
              <motion.div
                key={appState}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </motion.div>
      </div>
      <footer className="w-full text-center text-neon-cyan/40 text-sm mt-12 pb-4">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </div>
  );
}