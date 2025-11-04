import React from 'react';
import { motion } from 'framer-motion';
import { useSongStore } from '@/stores/useSongStore';
import { mockAlbums } from '@/lib/mockSpotifyData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
export function AlbumSelection() {
  const selectAlbum = useSongStore((state) => state.selectAlbum);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
    >
      {mockAlbums.map((album) => (
        <motion.div key={album.id} variants={itemVariants}>
          <Card className="bg-deep-purple/50 border-2 border-neon-pink/30 rounded-xl shadow-neon-pink/20 backdrop-blur-sm text-center overflow-hidden h-full flex flex-col group hover:border-neon-pink transition-all duration-300">
            <CardHeader className="p-0">
              <img src={album.coverUrl} alt={`${album.title} cover`} className="w-full h-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-300" />
            </CardHeader>
            <CardContent className="p-4 flex-grow flex flex-col justify-center">
              <CardTitle className="text-xl font-bold text-neon-pink">{album.title}</CardTitle>
              <p className="text-md text-neon-pink/80">{album.artist}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                onClick={() => selectAlbum(album.id)}
                className="w-full bg-neon-pink/10 border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-deep-purple hover:shadow-neon-pink transition-all duration-300"
              >
                Select Album
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}