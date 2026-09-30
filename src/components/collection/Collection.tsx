'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { collectionData, type CollectionItem } from '@/data/collection'

interface CollectionCardProps {
  item: CollectionItem
  index: number
}

function CollectionCard({ item, index }: CollectionCardProps) {
  return (
    <motion.article
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface border border-emerald-900/70 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <ImageReveal
        src={item.image}
        alt={item.imageAlt}
        wrapperClassName="w-full h-full"
        revealClassName=""
        className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
      />

      {/* Subtle permanent dark gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10 transition-opacity duration-300" />

      {/* Card Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-300 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-emerald-500/30">
            {item.style}
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-900/60 backdrop-blur-md border border-emerald-700/40 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-400 group-hover:text-black transition-all duration-300">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors drop-shadow-sm">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 line-clamp-2 font-medium leading-relaxed drop-shadow-sm">
            {item.description}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export function Collection() {
  return (
    <section id="collection" className="section relative overflow-hidden bg-background border-t border-emerald-900/40" aria-labelledby="collection-heading">
      {/* Ambient Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageReveal
          src="/images/collection/nature.jpg"
          alt=""
          wrapperClassName="w-full h-full"
          revealClassName=""
          className="w-full h-full object-cover opacity-10 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" aria-hidden="true" />
      </div>

      <div className="container-main relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-emerald-400 font-bold mb-3">
              Koleksi Gaya
            </p>
            <h2 id="collection-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
              Karakter Alam. <br />
              <span className="text-emerald-300 font-medium">Eksplorasi estetika aquascape.</span>
            </h2>
          </motion.div>

          <motion.p
            className="text-sm sm:text-base text-emerald-100 max-w-sm font-normal leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Setiap aliran dirancang dengan prinsip tata ruang, keseimbangan tanaman hidup, dan stabilitas biologi jangka panjang.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collectionData.map((item, index) => (
            <CollectionCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}