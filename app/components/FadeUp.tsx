'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
}

export default function FadeUp({ children, delay = 0 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' } as Parameters<typeof useInView>[1])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
