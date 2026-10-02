'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#collection', label: 'Collection' },
  { href: '#services', label: 'Services' },
  { href: '#catalog', label: 'Katalog' },
  { href: '#works', label: 'Works' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { totalItems, toggleCart } = useCart()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16" aria-hidden="true">
        <div className="container-main h-full" />
      </header>
    )
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo',
        isScrolled
          ? 'h-16 bg-background/90 backdrop-blur-xl border-b border-emerald-900/50 shadow-sm'
          : 'h-20 bg-transparent'
      )}
      role="banner"
    >
      <nav className="container-main h-full flex items-center justify-between" aria-label="Main navigation">
        <Link
          href="#home"
          className="font-heading font-bold text-lg tracking-wider transition-opacity hover:opacity-90"
          aria-label="AquaSpace - Home"
        >
          <span className={cn(
            'transition-colors duration-300',
            isScrolled ? 'text-white' : 'text-white drop-shadow-sm'
          )}>
            AQUASPACE
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-xs tracking-widest uppercase font-medium transition-all duration-200',
                isScrolled ? 'text-gray-200 hover:text-white' : 'text-gray-100 hover:text-white drop-shadow-sm'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Cart Trigger Button */}
          <button
            onClick={toggleCart}
            className={cn(
              'relative p-2 rounded-full transition-all flex items-center justify-center',
              isScrolled
                ? 'text-white hover:bg-emerald-900/50'
                : 'text-white hover:bg-white/15 drop-shadow-sm'
            )}
            aria-label={`Buka Keranjang (${totalItems} item)`}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'hidden md:inline-flex text-xs uppercase tracking-widest font-semibold border rounded-full px-4 py-1.5 transition-all',
              isScrolled
                ? 'text-white border-emerald-800/60 hover:bg-white hover:text-black'
                : 'text-white border-white/50 hover:bg-white hover:text-black drop-shadow-sm'
            )}
            onClick={() => window.open(getWhatsAppUrl(), '_blank')}
          >
            Konsultasi
          </Button>

          <button
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              isScrolled ? 'text-text-primary' : 'text-white'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center bg-background border-t border-text-secondary/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <div className="flex flex-col items-center gap-8 px-6">
                {navItems.map((item, index) => (
                  <motion.link
                    key={item.href}
                    href={item.href}
                    className="font-heading text-heading-md text-text-primary hover:text-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    {item.label}
                  </motion.link>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * navItems.length, duration: 0.4 }}
                  className="flex flex-col gap-3 w-full max-w-xs"
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 border border-emerald-500/40 text-emerald-300"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      toggleCart()
                    }}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Keranjang ({totalItems})</span>
                  </Button>

                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      window.open(getWhatsAppUrl(), '_blank')
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    Konsultasi WhatsApp
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

function getWhatsAppUrl(): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628992846900'
  const message = encodeURIComponent('Halo AquaSpace, saya ingin berkonsultasi mengenai pembuatan aquascape.')
  return `https://wa.me/${phoneNumber}?text=${message}`
}