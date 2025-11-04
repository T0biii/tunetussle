import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Music } from 'lucide-react';
export function SpotifyLogin() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="flex flex-col items-center justify-center text-center p-8 bg-deep-purple/50 border-2 border-neon-cyan/30 rounded-xl shadow-neon-cyan/20 backdrop-blur-sm"
    >
      <Music className="w-16 h-16 text-neon-pink animate-pulse" />
      <h2 className="text-4xl font-bold text-neon-cyan mt-6">Welcome to TuneTussle</h2>
      <p className="text-lg text-neon-cyan/80 mt-2 max-w-md">
        Discover your favorite tracks from iconic albums by battling them head-to-head.
      </p>
      <Button
        asChild
        className="mt-8 bg-green-500 text-white font-bold text-lg py-6 px-8 rounded-full hover:bg-green-600 hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-lg shadow-green-500/30"
      >
        <a href="/api/spotify/login">
          <svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Spotify icon</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.923 17.453c-.225.352-.675.465-1.027.24l-3.53-2.145c-.352-.225-.465-.675-.24-1.027.225-.352.675-.465 1.027-.24l3.53 2.145c.352.225.465.675.24 1.027zm1.125-2.577c-.28.434-.84.57-1.272.285l-4.286-2.59c-.434-.28-.57-.84-.285-1.272.28-.434.84-.57 1.272-.285l4.286 2.59c.434.28.57.84.285 1.272zm.105-2.82c-.343.525-1.02.69-1.547.343L7.19 8.39C6.665 8.047 6.5 7.363 6.843 6.838c.343-.525 1.02-.69 1.547-.343l8.694 5.235c.525.343.69 1.02.343 1.547z"></path></svg>
          Login with Spotify
        </a>
      </Button>
    </motion.div>
  );
}