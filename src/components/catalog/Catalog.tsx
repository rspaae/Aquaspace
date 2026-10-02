'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ShoppingBag,
  Star,
  Zap,
  CheckCircle2,
  ChevronRight,
  Package,
  Plus,
  Minus,
  MessageSquare,
  Receipt,
  Check,
} from 'lucide-react'
import { ImageReveal } from '@/components/ui/ImageReveal'
import {
  productsData,
  categoriesData,
  type ProductItem,
  type ProductCategory,
} from '@/data/products'
import { useCart } from '@/context/CartContext'

const badgeStyles: Record<string, string> = {
  emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  amber: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  sky: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  rose: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
}

// ── Category Tabs ─────────────────────────────────────────────────────────────

interface CategoryTabsProps {
  active: ProductCategory
  onSelect: (cat: ProductCategory) => void
  counts: Record<string, number>
}

function CategoryTabs({ active, onSelect, counts }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter kategori produk">
      {categoriesData.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={active === cat.id}
          onClick={() => onSelect(cat.id)}
          className={`
            relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 border
            ${active === cat.id
              ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg shadow-emerald-500/25'
              : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50 hover:bg-emerald-900/60 hover:border-emerald-600/60 hover:text-emerald-200'
            }
          `}
        >
          {cat.label}
          {cat.id !== 'semua' && (
            <span className={`ml-1.5 text-xs ${active === cat.id ? 'text-black/60' : 'text-emerald-500/70'}`}>
              ({counts[cat.id] ?? 0})
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ── Product Card ──────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: ProductItem
  index: number
  onOpen: (p: ProductItem) => void
}

function ProductCard({ product, index, onOpen }: ProductCardProps) {
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const badgeClass = product.badgeColor ? badgeStyles[product.badgeColor] : badgeStyles.emerald

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product, 1, true)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-2xl overflow-hidden bg-surface border border-emerald-900/60 hover:border-emerald-600/60 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-950/50 cursor-pointer"
      onClick={() => onOpen(product)}
      tabIndex={0}
      role="button"
      aria-label={`Lihat detail ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(product) }
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-background">
        <ImageReveal
          src={product.image}
          alt={product.imageAlt}
          wrapperClassName="w-full h-full"
          revealClassName=""
          className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${badgeClass}`}>
            {product.badge}
          </span>
        )}
        {product.isNew && !product.badge && (
          <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border bg-sky-500/20 text-sky-300 border-sky-500/40">
            Baru
          </span>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-bold tracking-wider uppercase text-white bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            Lihat Detail
          </span>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-xs font-bold tracking-wider uppercase text-white/60">Stok Habis</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-bold mb-1">{product.categoryLabel}</p>
        <h3 className="text-base sm:text-lg font-heading font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed line-clamp-2 mb-4 font-normal">
          {product.description}
        </p>

        <ul className="flex flex-col gap-1 mb-5">
          {product.features.slice(0, 2).map((feat) => (
            <li key={feat} className="flex items-center gap-1.5 text-xs text-emerald-200/80">
              <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0" />
              {feat}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-emerald-900/50">
          <div>
            <p className="text-lg sm:text-xl font-heading font-bold text-white">
              {product.priceLabel}
            </p>
            <p className="text-[10px] text-emerald-400/70 uppercase tracking-wider">/ {product.unit}</p>
          </div>
          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-black bg-emerald-400 hover:bg-emerald-300 transition-colors px-3.5 py-1.5 rounded-md cursor-pointer"
            aria-label={`Pesan ${product.name}`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5 text-black" />
                Ditambahkan
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Pesan
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

// ── Product Detail Modal ──────────────────────────────────────────────────────

interface ProductModalProps {
  product: ProductItem | null
  onClose: () => void
}

function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) return null
  const badgeClass = product.badgeColor ? badgeStyles[product.badgeColor] : badgeStyles.emerald

  const handleAddToCart = (openDrawer: boolean) => {
    addToCart(product, qty, openDrawer)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    if (openDrawer) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Detail produk: ${product.name}`}
        >
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background border border-emerald-800/60 shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              onClick={onClose}
              aria-label="Tutup modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Image */}
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none bg-surface">
                <ImageReveal
                  src={product.image}
                  alt={product.imageAlt}
                  priority
                  wrapperClassName="w-full h-full"
                  revealClassName=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {product.badge && (
                  <span className={`absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${badgeClass}`}>
                    {product.badge}
                  </span>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-bold">{product.categoryLabel}</p>
                  <p className="text-xl font-heading font-bold text-white mt-0.5 leading-snug">{product.name}</p>
                </div>
              </div>

              {/* Right: Content */}
              <div className="p-6 sm:p-7 flex flex-col gap-5 overflow-y-auto">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-heading font-bold text-emerald-400">{product.priceLabel}</span>
                  <span className="text-xs text-emerald-600 uppercase tracking-wider">/ {product.unit}</span>
                </div>

                <p className="text-sm text-emerald-100/80 leading-relaxed font-normal">{product.longDescription}</p>

                <div>
                  <p className="text-xs tracking-widest uppercase text-emerald-500 font-bold mb-2.5 flex items-center gap-1.5">
                    <Zap className="h-3 w-3" /> Keunggulan
                  </p>
                  <ul className="flex flex-col gap-2">
                    {product.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm text-emerald-100">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs tracking-widest uppercase text-emerald-500 font-bold mb-2.5 flex items-center gap-1.5">
                    <Package className="h-3 w-3" /> Spesifikasi
                  </p>
                  <div className="rounded-xl overflow-hidden border border-emerald-900/50">
                    {product.specs.map((spec, i) => (
                      <div
                        key={spec.label}
                        className={`flex justify-between items-center px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-emerald-950/40' : 'bg-transparent'}`}
                      >
                        <span className="text-emerald-400/80 font-medium text-xs">{spec.label}</span>
                        <span className="text-white font-semibold text-xs text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`flex items-center gap-2 text-xs font-semibold ${product.inStock ? 'text-emerald-400' : 'text-rose-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                  {product.inStock ? 'Stok Tersedia' : 'Stok Habis'}
                </div>

                {/* Quantity & Order Actions */}
                <div className="pt-2 border-t border-emerald-900/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-300 font-medium">Jumlah Pesanan:</span>
                    <div className="flex items-center gap-3 bg-emerald-950/90 border border-emerald-800/80 rounded-lg px-3 py-1">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="text-emerald-400 hover:text-white transition-colors"
                        aria-label="Kurang satu"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-mono font-bold text-white px-2">{qty}</span>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="text-emerald-400 hover:text-white transition-colors"
                        aria-label="Tambah satu"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      onClick={() => handleAddToCart(false)}
                      className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wide uppercase text-emerald-300 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      {added ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          Ditambahkan
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-3.5 w-3.5" />
                          + Keranjang
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleAddToCart(true)}
                      className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wide uppercase text-black bg-emerald-400 hover:bg-emerald-300 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Beli Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Main Section ──────────────────────────────────────────────────────────────

export function Catalog() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('semua')
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)

  const filtered = activeCategory === 'semua'
    ? productsData
    : productsData.filter((p) => p.category === activeCategory)

  const counts = categoriesData.reduce<Record<string, number>>((acc, cat) => {
    if (cat.id !== 'semua') {
      acc[cat.id] = productsData.filter((p) => p.category === cat.id).length
    }
    return acc
  }, {})

  const handleClose = useCallback(() => setSelectedProduct(null), [])

  return (
    <section
      id="catalog"
      className="section relative overflow-hidden bg-background border-t border-emerald-900/40"
      aria-labelledby="catalog-heading"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageReveal
          src="/images/catalog/led-full-spectrum.jpg"
          alt=""
          wrapperClassName="w-full h-full"
          revealClassName=""
          className="w-full h-full object-cover opacity-[0.07] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" aria-hidden="true" />
      </div>

      <div className="container-main relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-8">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-emerald-400 font-bold mb-3">
              Katalog Produk
            </p>
            <h2
              id="catalog-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-4"
            >
              Produk Pilihan. <br />
              <span className="text-emerald-300 font-medium">Kualitas aquascaper profesional.</span>
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 font-normal leading-relaxed">
              Dari aquarium rimless, tanaman aquatik premium, sistem CO2, hingga hardscape ekslusif — semua tersedia dengan garansi kualitas AquaSpace.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-8 shrink-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {[
              { value: `${productsData.length}+`, label: 'Produk' },
              { value: '5', label: 'Kategori' },
              { value: '100%', label: 'Original' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-heading font-bold text-emerald-400">{stat.value}</p>
                <p className="text-xs text-emerald-200/60 uppercase tracking-wider font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Category Tabs */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CategoryTabs active={activeCategory} onSelect={setActiveCategory} counts={counts} />
        </motion.div>

        {/* Products Grid */}
        <motion.div
          id="products-panel"
          role="tabpanel"
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onOpen={setSelectedProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Package className="h-12 w-12 text-emerald-800 mb-4" />
            <p className="text-emerald-400 font-semibold">Tidak ada produk di kategori ini</p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-emerald-900/50 bg-emerald-950/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <p className="text-sm font-bold text-white">Tidak menemukan yang Anda cari?</p>
            </div>
            <p className="text-sm text-emerald-100/70 font-normal">
              Kami dapat menyediakan produk kustom atau item di luar katalog. Konsultasikan kebutuhan Anda dengan tim kami.
            </p>
          </div>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628992846900'}?text=${encodeURIComponent('Halo AquaSpace! Saya ingin menanyakan produk yang tidak ada di katalog.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-black bg-white hover:bg-emerald-400 transition-colors py-3 px-7 rounded-full shadow-lg"
          >
            Konsultasi Produk
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal product={selectedProduct} onClose={handleClose} />
    </section>
  )
}
