import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { GalleryImage } from '../types';

/** Responsive photo grid with a simple keyboard-friendly lightbox. */
export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, images.length]);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {images.map((im, i) => (
          <button
            key={im.url + i}
            onClick={() => setOpen(i)}
            className={`group relative overflow-hidden rounded-card ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img src={im.url} alt={im.caption} loading="lazy" className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum/70 to-transparent p-3 text-left text-sm text-white opacity-0 transition group-hover:opacity-100">
              {im.caption}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-plum/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.figure key={open} initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <img src={images[open].url} alt={images[open].caption} className="max-h-[80vh] w-auto rounded-card" />
              <figcaption className="mt-3 text-center text-white/90">{images[open].caption}</figcaption>
            </motion.figure>
            <button className="absolute right-5 top-5 text-3xl text-white" aria-label="Close" onClick={() => setOpen(null)}>×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
