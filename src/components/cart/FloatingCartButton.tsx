'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export function FloatingCartButton() {
  const { totalItems, toggleCart, isCartOpen } = useCart()

  if (isCartOpen) return null

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={toggleCart}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs uppercase tracking-wider py-3 px-4 rounded-full shadow-lg border border-emerald-400/50 cursor-pointer transition-colors"
          aria-label={`Buka Keranjang (${totalItems} item)`}
        >
          <div className="relative flex items-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span>Keranjang ({totalItems})</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
