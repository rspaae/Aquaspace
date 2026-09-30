'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { worksData, type WorkItem } from '@/data/works'

interface WorksGridProps {
  onOpenLightbox: (index: number) => void
}

function WorksGrid({ onOpenLightbox }: WorksGridProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
      role="list"
      aria-label="Selected works gallery"
    >
      {worksData.map((work, index) => (
        <WorkCard key={work.id} work={work} index={index} onClick={() => onOpenLightbox(index)} />
      ))}
    </div>
  )
}

interface WorkCardProps {
  work: WorkItem
  index: number
  onClick: () => void
}

function WorkCard({ work, index, onClick }: WorkCardProps) {
  return (
    <motion.article
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View ${work.title} - ${work.style}, ${work.size}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface border border-emerald-900/60 mb-4">
        <ImageReveal
          src={work.image}
          alt={work.imageAlt}
          wrapperClassName="w-full h-full"
          revealClassName=""
          className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="text-xl font-heading font-bold text-white group-hover:text-emerald-300 transition-colors">
            {work.title}
          </h3>
          <p className="text-xs text-emerald-200 uppercase tracking-wider font-semibold mt-1">
            {work.style} • {work.size}
          </p>
        </div>
        <span className="text-xs text-emerald-300 font-semibold">
          {work.location.split(',')[0]}
        </span>
      </div>
    </motion.article>
  )
}

interface LightboxProps {
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ isOpen, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const work = worksData[currentIndex]

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox: ${work.title}`}
        >
          <motion.div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
              onClick={onClose}
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-emerald-900/60 mb-4 bg-surface">
              <ImageReveal
                src={work.image}
                alt={work.imageAlt}
                priority
                wrapperClassName="w-full h-full"
                revealClassName=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-0.5">
                  {work.style} • {work.size}
                </p>
                <h3 className="text-2xl font-heading font-bold">
                  {work.title}
                </h3>
                <p className="text-sm text-emerald-100 mt-1 font-normal">
                  {work.location} • {work.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors disabled:opacity-30"
                  onClick={onPrev}
                  disabled={currentIndex === 0}
                  aria-label="Previous work"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors disabled:opacity-30"
                  onClick={onNext}
                  disabled={currentIndex === worksData.length - 1}
                  aria-label="Next work"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function SelectedWorks() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <section id="works" className="section relative overflow-hidden bg-background border-t border-emerald-900/40" aria-labelledby="works-heading">
      {/* Ambient Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageReveal
          src="/images/works/work-01.jpg"
          alt=""
          wrapperClassName="w-full h-full"
          revealClassName=""
          className="w-full h-full object-cover opacity-10 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" aria-hidden="true" />
      </div>

      <div className="container-main relative z-10">
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="text-xs tracking-[0.25em] uppercase text-emerald-400 font-bold mb-3">
            Portofolio
          </p>
          <h2 id="works-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-4">
            Karya Terpilih. <br />
            <span className="text-emerald-300 font-medium">Instalasi nyata di ruang privat & publik.</span>
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 font-normal leading-relaxed">
            Klik pada setiap karya untuk melihat detail komposisi hardscape, varietas tanaman, dan spesifikasi peralatan pendukung.
          </p>
        </div>

        <WorksGrid onOpenLightbox={(idx) => setLightboxIndex(idx)} />

        <Lightbox
          isOpen={lightboxIndex !== null}
          currentIndex={lightboxIndex || 0}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
          onNext={() => setLightboxIndex((prev) => (prev !== null && prev < worksData.length - 1 ? prev + 1 : prev))}
        />
      </div>
    </section>
  )
}