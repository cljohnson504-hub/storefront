import React from 'react'

const motion = {
  div: React.forwardRef(function MotionDiv(
    { children, className, style, onClick, ...rest }: React.HTMLAttributes<HTMLDivElement> & { [key: string]: unknown },
    ref: React.Ref<HTMLDivElement>
  ) {
    return <div ref={ref} className={className} style={style} onClick={onClick} {...rest}>{children}</div>
  }),
  img: React.forwardRef(function MotionImg(
    { src, alt, className, onClick, ...rest }: React.ImgHTMLAttributes<HTMLImageElement> & { [key: string]: unknown },
    ref: React.Ref<HTMLImageElement>
  ) {
    return <img ref={ref} src={src} alt={alt} className={className} onClick={onClick} {...rest} />
  }),
}

function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function useInView() {
  return true
}

export { motion, AnimatePresence, useInView }
