'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ImageReveal } from '@/components/ui/ImageReveal'
import { servicesData, type ServiceItem } from '@/data/services'

interface ServiceCardProps {
  item: ServiceItem
  index: number
}

function ServiceCard({ item, index }: ServiceCardProps) {
  return (
    <motion.div
      className="group py-10 lg:py-12 border-t border-emerald-900/50 first:border-0 transition-colors"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Number */}
        <div className="lg:col-span-1">
          <span className="font-heading text-sm font-bold tracking-widest text-emerald-400">
            {item.number}
          </span>
        </div>

        {/* Thumbnail Image */}
        {item.image && (
          <div className="lg:col-span-3 aspect-[4/3] rounded-xl overflow-hidden bg-surface border border-emerald-900/60">
            <ImageReveal
              src={item.image}
              alt={item.imageAlt || item.title}
              wrapperClassName="w-full h-full"
              revealClassName=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo"
            />
          </div>
        )}

        {/* Content */}
        <div className="lg:col-span-6">
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm sm:text-base text-emerald-100 font-normal leading-relaxed mb-4">
            {item.description}
          </p>

          {item.features && item.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.features.map((feat) => (
                <span
                  key={feat}
                  className="text-xs px-3 py-1 rounded-md bg-emerald-900/60 text-emerald-200 border border-emerald-700/40 font-medium"
                >
                  {feat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Link */}
        <div className="lg:col-span-2 flex lg:justify-end">
          <a
            href={getWhatsAppUrl(item.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-black bg-white hover:bg-emerald-400 hover:text-black transition-all py-2.5 px-5 rounded-full shadow-md"
          >
            <span>Konsultasi</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function getWhatsAppUrl(service?: string): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628992846900'
  const message = encodeURIComponent(`Halo AquaSpace, saya ingin berkonsultasi mengenai: ${service}.`)
  return `https://wa.me/${phoneNumber}?text=${message}`
}

export function Services() {
  return (
    <section id="services" className="section relative overflow-hidden bg-background border-t border-emerald-900/40" aria-labelledby="services-heading">
      {/* Ambient Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageReveal
          src="/images/services/aquarium-setup.jpg"
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
            Layanan Kami
          </p>
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-4">
            Pendekatan Menyeluruh. <br />
            <span className="text-emerald-300 font-medium">Dari instalasi hingga perawatan berkala.</span>
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 font-normal leading-relaxed">
            Setiap proyek ditangani oleh aquascaper berpengalaman dengan peralatan filtrasi, pencahayaan spektrum penuh, dan parameter air terstandarisasi.
          </p>
        </div>

        <div className="border-b border-emerald-900/50" role="list" aria-label="Services list">
          {servicesData.map((item, index) => (
            <ServiceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}