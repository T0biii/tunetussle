import React from 'react';
import { motion } from 'framer-motion';
import { useSongStore } from '@/stores/useSongStore';
import { RankedSongItem } from './RankedSongItem';
import { Button } from '@/components/ui/button';
import { Swords, Share2 } from 'lucide-react';
import { toast } from 'sonner';
export function RankingList() {
  const songs = useSongStore((state) => state.songs);
  const startNew = useSongStore((state) => state.startNew);
  const selectedAlbum = useSongStore((state) => state.selectedAlbum);
  const handleShare = () => {
    if (!selectedAlbum) return;
    const title = `My TuneTussle Rankings for ${selectedAlbum.title}:\n\n`;
    const rankingText = songs
      .map((song, index) => `${index + 1}. ${song.title}`)
      .join('\n');
    const fullText = title + rankingText;
    navigator.clipboard.writeText(fullText).then(() => {
      toast.success("Results copied to clipboard!");
    }, (err) => {
      toast.error("Failed to copy results.");
      console.error('Could not copy text: ', err);
    });
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-deep-purple/50 border-2 border-neon-cyan/30 rounded-xl shadow-neon-cyan/20 p-4 md:p-6 backdrop-blur-sm space-y-3"
    >
      {selectedAlbum && (
        <div className="text-center mb-4 border-b border-neon-cyan/20 pb-4">
          <h2 className="text-3xl font-bold text-neon-cyan">{selectedAlbum.title}</h2>
          <p className="text-lg text-neon-cyan/80">{selectedAlbum.artist}</p>
        </div>
      )}
      <div className="max-h-[calc(80vh-220px)] overflow-y-auto pr-2 space-y-3">
        {songs.map((song, index) => (
          <RankedSongItem key={song.id} song={song} rank={index + 1} />
        ))}
      </div>
      <div className="pt-4 border-t border-neon-cyan/20 flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleShare}
          className="w-full bg-neon-pink/10 border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-deep-purple hover:shadow-neon-pink transition-all duration-300"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
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