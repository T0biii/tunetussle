import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Song } from '@/stores/useSongStore';
interface SortableSongItemProps {
  song: Song;
  rank: number;
}
export function SortableSongItem({ song, rank }: SortableSongItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: song.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center p-4 bg-deep-purple/30 border-2 border-neon-cyan/20 rounded-lg shadow-lg transition-all duration-300 ease-in-out',
        'hover:border-neon-pink hover:shadow-neon-pink/30',
        isDragging ? 'z-10 opacity-50 scale-105 shadow-neon-pink/60' : 'opacity-100'
      )}
    >
      <div className="flex items-center gap-4 w-full">
        <span className="text-2xl font-bold text-neon-cyan/80 w-8 text-center">{rank}</span>
        <div className="flex-grow">
          <p className="text-lg font-bold text-neon-pink">{song.title}</p>
          <p className="text-sm text-neon-cyan/70">{song.artist}</p>
        </div>
        <button
          {...attributes}
          {...listeners}
          className="p-2 cursor-grab active:cursor-grabbing touch-none text-neon-cyan/50 hover:text-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink rounded"
          aria-label={`Drag to reorder ${song.title}`}
        >
          <GripVertical size={24} />
        </button>
      </div>
    </div>
  );
}