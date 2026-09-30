'use client'

import { motion } from 'framer-motion'
import { ImageReveal } from '@/components/ui/ImageReveal'

const stats = [
  { value: '50+', label: 'Aquascapes Handcrafted' },
  { value: '04+', label: 'Years Experience' },
  { value: '100%', label: 'Natural Ecosystem' },
]

export function About() {
  return (
    <section id="about" className="section relative overflow-hidden bg-background border-t border-emerald-900/40" aria-labelledby="about-heading">
      {/* Ambient Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageReveal
          src="/images/cta.jpg"
          alt=""
          wrapperClassName="w-full h-full"
          revealClassName=""
          className="w-full h-full object-cover opacity-15 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" aria-hidden="true" />
      </div>

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Image */}
          <motion.div
            className="lg:col-span-5 relative aspect-[4/5] overflow-hidden rounded-2xl border border-emerald-900/60"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImageReveal
              src="/images/about.jpg"
              alt="AquaSpace Studio craftsman"
              wrapperClassName="w-full h-full"
              revealClassName=""
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* Right: Content */}
          <div className="lg:col-span-7 lg:pl-6">
            <motion.p
              className="text-xs tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Tentang Studio
            </motion.p>

            <motion.h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Keseimbangan antara <br />
              <span className="font-extrabold text-emerald-400">seni visual</span> dan <span className="font-extrabold text-emerald-400">ilmu biologi</span>.
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-emerald-100 font-normal leading-relaxed mb-12 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              AquaSpace adalah studio aquascape dan galeri akuarium alami di Bandung. Kami merancang lanskap bawah air kustom yang menyatu dengan estetika interior modern, didukung pemilihan hardscape selektif dan kontrol parameter air yang presisi.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8 border-t border-emerald-800/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}