import Link from 'next/link'
import { Instagram, MessageSquare, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-emerald-900/40 bg-background py-16 lg:py-20" role="contentinfo">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-emerald-900/40">
          <div className="md:col-span-6">
            <p className="font-heading text-xl font-bold text-white tracking-wider mb-4">
              AQUASPACE
            </p>
            <p className="text-sm sm:text-base text-emerald-100 font-normal max-w-sm leading-relaxed mb-6">
              Studio Aquascape & Galeri Akuarium Alam di Bandung. Menghadirkan ekosistem air tawar hidup berkualitas tinggi untuk ruang hunian & komersial.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-emerald-800/60 hover:border-emerald-500/60 flex items-center justify-center text-white hover:text-emerald-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-emerald-800/60 hover:border-emerald-400 flex items-center justify-center text-white hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-4">
              Lokasi Studio
            </p>
            <div className="space-y-3 text-sm text-emerald-100 font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Bandung, Jawa Barat, Indonesia</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MessageSquare className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 font-medium transition-colors">
                  +62 812-3456-7890
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-4">
              Navigasi
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 text-sm text-emerald-100 font-medium">
                <li><Link href="#home" className="hover:text-emerald-300 transition-colors">Home</Link></li>
                <li><Link href="#about" className="hover:text-emerald-300 transition-colors">About</Link></li>
                <li><Link href="#collection" className="hover:text-emerald-300 transition-colors">Collection</Link></li>
                <li><Link href="#services" className="hover:text-emerald-300 transition-colors">Services</Link></li>
                <li><Link href="#works" className="hover:text-emerald-300 transition-colors">Works</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-normal">
          <p>© {currentYear} AquaSpace Studio. All rights reserved.</p>
          <p>Handcrafted Nature Aquariums.</p>
        </div>
      </div>
    </footer>
  )
}

function getWhatsAppUrl(): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890'
  const message = encodeURIComponent('Halo AquaSpace, saya ingin berkonsultasi mengenai pembuatan aquascape.')
  return `https://wa.me/${phoneNumber}?text=${message}`
}