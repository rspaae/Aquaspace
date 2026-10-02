'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ImageReveal } from '@/components/ui/ImageReveal'

export function CTA() {
  return (
    <section id="cta" className="section relative overflow-hidden bg-black border-t border-white/5" aria-labelledby="cta-heading">
      <div className="absolute inset-0 z-0">
        <ImageReveal
          src="/images/cta.jpg"
          alt="AquaSpace studio aquascape"
          wrapperClassName="w-full h-full"
          revealClassName=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/85 to-background/95" aria-hidden="true" />
      </div>

      <div className="container-main relative z-10 text-center">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-4">
            Mulai Diskusi
          </p>

          <h2 id="cta-heading" className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Ciptakan Lanskap Air <br />
            <span className="text-emerald-300 font-bold">Eksklusif Milik Anda.</span>
          </h2>

          <p className="text-base sm:text-lg text-emerald-100 font-medium max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Ceritakan konsep atau ruang yang Anda miliki. Tim kami akan memberikan rekomendasi hardscape, tanaman, dan estimasi pengerjaan.
          </p>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black hover:bg-emerald-400 hover:text-black transition-all duration-300 font-semibold text-sm shadow-xl"
          >
            <span>Konsultasi WhatsApp</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function getWhatsAppUrl(): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628992846900'
  const message = encodeURIComponent('Halo AquaSpace, saya ingin berkonsultasi mengenai pembuatan aquascape custom.')
  return `https://wa.me/${phoneNumber}?text=${message}`
}