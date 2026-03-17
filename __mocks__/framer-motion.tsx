import React from 'react'

const motion = {
  div: React.forwardRef(function MotionDiv(
    { children, className, style, onClick }: React.HTMLAttributes<HTMLDivElement>,
    ref: React.Ref<HTMLDivElement>
  ) {
    return <div ref={ref} className={className} style={style} onClick={onClick}>{children}</div>
  }),
  img: React.forwardRef(function MotionImg(
    { src, alt, className, onClick }: React.ImgHTMLAttributes<HTMLImageElement>,
    ref: React.Ref<HTMLImageElement>
  ) {
    return <img ref={ref} src={src} alt={alt} className={className} onClick={onClick} />
  }),
}

function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function useInView() {
  return true
}

export { motion, AnimatePresence, useInView }
