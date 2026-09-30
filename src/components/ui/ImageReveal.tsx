'use client'

import { forwardRef, type ImgHTMLAttributes, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageRevealProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string
  revealClassName?: string
  priority?: boolean
}

export const ImageReveal = forwardRef<HTMLImageElement, ImageRevealProps>(
  (
    {
      className,
      wrapperClassName,
      revealClassName,
      src,
      alt,
      priority = false,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInView, setIsInView] = useState(priority)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (priority || isInView) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        },
        { rootMargin: '100px', threshold: 0.1 }
      )

      if (wrapperRef.current) {
        observer.observe(wrapperRef.current)
      }

      return () => observer.disconnect()
    }, [priority, isInView])

    return (
      <div
        ref={wrapperRef}
        className={cn(
          'relative overflow-hidden bg-text-secondary/10',
          wrapperClassName
        )}
        aria-hidden={!isInView && !priority}
      >
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-transform duration-[1200ms] ease-out-expo',
            isInView || isLoaded ? 'scale-100' : 'scale-[1.08]',
            revealClassName
          )}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
        {!isLoaded && (
          <div
            className="absolute inset-0 bg-gradient-to-b from-text-secondary/10 to-transparent animate-pulse"
            aria-hidden="true"
          />
        )}
      </div>
    )
  }
)

ImageReveal.displayName = 'ImageReveal'