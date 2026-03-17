'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BeforeAfterProps {
  label: string
  beforeImageUrl: string
  afterImageUrl?: string
  primaryColor: string
}

export default function BeforeAfter({ label, beforeImageUrl, afterImageUrl, primaryColor }: BeforeAfterProps) {
  const [current, setCurrent] = useState<'before' | 'after'>('before')
  const [hasBeenTapped, setHasBeenTapped] = useState(false)

  function toggle() {
    setCurrent(prev => (prev === 'before' ? 'after' : 'before'))
    setHasBeenTapped(true)
  }

  return (
    <section className="px-6 py-12 bg-white">
      <h2
        style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: '12px' }}
        className="text-2xl font-bold text-gray-900 mb-6"
      >
        {label}
      </h2>

      {afterImageUrl ? (
        <>
          <div
            data-testid="before-after-container"
            className="relative aspect-[4/3] w-full overflow-hidden rounded-lg cursor-pointer"
            onClick={toggle}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={current === 'before' ? beforeImageUrl : afterImageUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </AnimatePresence>
            <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full z-10">
              {current === 'before' ? 'BEFORE' : 'AFTER'}
            </span>
          </div>
          {!hasBeenTapped && (
            <p className="text-sm text-gray-400 text-center mt-2">Tap to reveal after</p>
          )}
        </>
      ) : (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <img role="img" src={beforeImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full z-10">
            BEFORE
          </span>
        </div>
      )}
    </section>
  )
}
