'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ImageReveal } from '@/components/ui/ImageReveal'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Scroll animations
  const textY = useTransform(scrollYProgress, [0, 0.6, 1], [0, -60, -120])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85], [1, 0.7, 0])
  const textScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.9])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
      aria-labelledby="hero-heading"
    >
      {/* Background Cinematic Image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imageScale }}
      >
        <ImageReveal
          src="/images/hero.jpg"
          alt="AquaSpace Studio showcase"
          priority
          className="w-full h-full object-cover"
          wrapperClassName="w-full h-full"
          revealClassName=""
        />
        
        {/* Dynamic scroll overlay */}
        <motion.div
          className="absolute inset-0 bg-black/75"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />

        {/* Soft vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/70" aria-hidden="true" />
      </motion.div>

      {/* Centered Minimalist Typography with Scroll Animation */}
      <motion.div
        className="container-main relative z-10 text-center px-4 max-w-4xl"
        style={{
          y: textY,
          opacity: textOpacity,
          scale: textScale,
        }}
      >
        <motion.p
          className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-emerald-400 mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          AquaSpace Studio • Bandung
        </motion.p>

        <motion.h1
          id="hero-heading"
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black text-white tracking-tight leading-none mb-6 drop-shadow-[0_10px_35px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          Living Art.
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white font-medium max-w-xl mx-auto tracking-wide leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          Hadirkan ketenangan ekosistem alam bawah air ke dalam ruang Anda.
        </motion.p>
      </motion.div>

      {/* Minimal Scroll Cue */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white hover:text-emerald-400 transition-colors cursor-pointer drop-shadow-md"
        style={{ opacity: scrollIndicatorOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        aria-label="Scroll to explore"
      >
        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-gray-200">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  )
}