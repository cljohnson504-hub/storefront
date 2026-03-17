'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from './FadeUp'

interface GalleryProps {
  label: string
  images: string[]
  primaryColor: string
}

export default function Gallery({ label, images, primaryColor }: GalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  return (
    <section>
      <h2
        style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: '12px' }}
        className="text-2xl font-bold text-gray-900 mb-6"
      >
        {label}
      </h2>

      <div className="columns-2 md:columns-3 gap-2">
        {images.map((src, index) => (
          <FadeUp key={src} delay={Math.min(index * 0.1, 0.5)}>
            <div
              className="break-inside-avoid mb-2 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedPhoto(src)}
              data-testid="gallery-item"
            >
              <img src={src} alt="" className="w-full h-auto" />
            </div>
          </FadeUp>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={() => setSelectedPhoto(null)}
            data-testid="lightbox-overlay"
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>
            <img
              src={selectedPhoto}
              alt=""
              className="max-w-full max-h-full object-contain p-4"
              onClick={e => e.stopPropagation()}
              data-testid="lightbox-image"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
