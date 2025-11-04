import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSongStore } from '@/stores/useSongStore';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
function AlbumSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[250px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
export function AlbumSelection() {
  const selectAlbum = useSongStore((state) => state.selectAlbum);
  const searchAlbums = useSongStore((state) => state.searchAlbums);
  const albums = useSongStore((state) => state.albums);
  const isSearching = useSongStore((state) => state.isSearching);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
  useEffect(() => {
    searchAlbums(debouncedQuery);
  }, [debouncedQuery, searchAlbums]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neon-cyan/50" />
        <Input
          type="text"
          placeholder="Search albums by title or artist..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-deep-purple/50 border-2 border-neon-cyan/30 rounded-lg pl-12 pr-4 py-6 text-lg text-neon-cyan placeholder:text-neon-cyan/50 focus:ring-neon-pink focus:border-neon-pink transition-colors"
        />
      </div>
      {isSearching && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[...Array(6)].map((_, i) => <AlbumSkeleton key={i} />)}
        </div>
      )}
      {!isSearching && albums.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
        >
          {albums.map((album) => (
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
      )}
      {!isSearching && albums.length === 0 && debouncedQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 px-6 bg-deep-purple/50 border-2 border-neon-cyan/30 rounded-xl"
        >
          <p className="text-2xl font-bold text-neon-cyan">No Albums Found</p>
          <p className="text-neon-cyan/70 mt-2">Try a different search term.</p>
        </motion.div>
      )}
    </div>
  );
}