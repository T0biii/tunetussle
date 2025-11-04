import React, { useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import { useSongStore } from '@/stores/useSongStore';
import { SortableSongItem } from '@/components/SortableSongItem';
export function HomePage() {
  const songs = useSongStore((state) => state.songs);
  const moveSong = useSongStore((state) => state.moveSong);
  const songIds = useMemo(() => songs.map((song) => song.id), [songs]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = songIds.indexOf(active.id as string);
      const newIndex = songIds.indexOf(over.id as string);
      moveSong(oldIndex, newIndex);
    }
  }
  return (
    <div className="min-h-screen bg-deep-purple flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-pixel relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-neon-cyan/10 [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="w-full max-w-4xl mx-auto"
      >
        <header className="text-center mb-8 md:mb-12">
          <h1
            className="text-5xl md:text-7xl font-bold text-neon-pink animate-neon-glow shadow-neon-pink"
            style={{ textShadow: '0 0 5px #ff6bed, 0 0 10px #ff6bed, 0 0 20px #ff6bed, 0 0 40px #ff6bed' }}
          >
            TuneTussle
          </h1>
          <p className="text-neon-cyan/80 mt-2 text-lg md:text-xl">Drag & drop to rank your favorite tracks.</p>
        </header>
        <main className="bg-deep-purple/50 border-2 border-neon-cyan/30 rounded-xl shadow-neon-cyan/20 p-4 md:p-6 backdrop-blur-sm">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={songIds} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {songs.length > 0 ? (
                  songs.map((song, index) => (
                    <SortableSongItem key={song.id} song={song} rank={index + 1} />
                  ))
                ) : (
                  <div className="text-center py-12 text-neon-cyan/50">
                    <Music size={48} className="mx-auto mb-4" />
                    <p>No songs to rank.</p>
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </main>
      </motion.div>
      <footer className="absolute bottom-4 text-center text-neon-cyan/40 text-sm">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </div>
  );
}