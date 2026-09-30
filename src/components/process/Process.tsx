'use client'

import { motion } from 'framer-motion'
import { ImageReveal } from '@/components/ui/ImageReveal'

interface ProcessStep {
  number: string
  title: string
  description: string
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Konsultasi & Pengukuran Ruang',
    description: 'Diskusi mengenai preferensi gaya, dimensi akuarium, titik pencahayaan, dan kesiapan area instalasi Anda.',
  },
  {
    number: '02',
    title: 'Kurasi Hardscape & Tanaman',
    description: 'Pemilihan batu alam (Seiryu/Dragon), kayu apung, serta daftar tanaman aquatic yang cocok dengan ekosistem yang ditargetkan.',
  },
  {
    number: '03',
    title: 'Instalasi & Planting Presisi',
    description: 'Perakitan hardscape di lokasi, penataan substrat, penanaman flora secara hati-hati, dan aktivasi sistem filtrasi/CO2.',
  },
  {
    number: '04',
    title: 'Stabilisasi & Pendampingan',
    description: 'Pemantauan parameter air (cycling period), panduan dosing pupuk cair, dan jadwal perawatan rutin berkala.',
  },
]

export function Process() {
  return (
    <section id="process" className="section relative overflow-hidden bg-background border-t border-emerald-900/40" aria-labelledby="process-heading">
      {/* Ambient Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageReveal
          src="/images/collection/jungle.jpg"
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
            Alur Kerja
          </p>
          <h2 id="process-heading" className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-4">
            Proses Eksekusi. <br />
            <span className="text-emerald-300 font-medium">Ketelitian di setiap fase pembuatan.</span>
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 font-normal leading-relaxed">
            Metode terstruktur menjamin ekosistem aquascape Anda tetap jernih, sehat, dan berkembang dengan stabil dari hari pertama.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              className="p-8 rounded-2xl bg-surface border border-emerald-900/60 flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <span className="font-heading text-xs font-bold tracking-widest text-emerald-400 block mb-6">
                  PHASE {step.number}
                </span>
                <h3 className="text-lg font-heading font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-emerald-100 font-normal leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}