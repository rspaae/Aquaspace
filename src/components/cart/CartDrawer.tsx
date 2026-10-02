'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  Copy,
  Check,
  User,
  ArrowRight,
} from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    customerDetails,
    updateCustomerDetails,
    invoiceId,
  } = useCart()

  const [copied, setCopied] = useState(false)
  const [showCustomerForm, setShowCustomerForm] = useState(false)

  // Format currency to IDR
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format current date in Indonesian
  const getCurrentDateFormatted = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return now.toLocaleDateString('id-ID', options)
  }

  // Generate clean, professional WhatsApp message text (strictly no emojis)
  const getWhatsAppMessage = () => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628992846900'
    const dateStr = getCurrentDateFormatted()

    const itemLines = items
      .map((item, index) => {
        const itemSubtotal = formatCurrency(item.product.price * item.quantity)
        return `${index + 1}. ${item.product.name}\n   Jumlah: ${item.quantity} ${item.product.unit} @ ${item.product.priceLabel}\n   Subtotal: ${itemSubtotal}`
      })
      .join('\n\n')

    const customerInfo = [
      customerDetails.name ? `Nama        : ${customerDetails.name}` : 'Nama        : -',
      customerDetails.phone ? `Kontak/WA   : ${customerDetails.phone}` : '',
      customerDetails.address ? `Alamat/Kota : ${customerDetails.address}` : '',
      customerDetails.notes ? `Catatan     : ${customerDetails.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const rawMessage = [
      'NOTA PESANAN - AQUASPACE STUDIO',
      '========================================',
      `No. Nota    : #${invoiceId}`,
      `Tanggal     : ${dateStr}`,
      '----------------------------------------',
      'DATA PEMESAN:',
      customerInfo,
      '----------------------------------------',
      `DAFTAR ITEM (${totalItems} barang):`,
      itemLines,
      '----------------------------------------',
      `TOTAL PEMBAYARAN: ${formatCurrency(totalPrice)}`,
      '========================================',
      '',
      'Halo Admin AquaSpace, saya ingin mengonfirmasi pesanan sesuai nota di atas. Mohon informasi ketersediaan stok, ongkos kirim, dan nomor rekening pembayaran. Terima kasih.',
    ].join('\n')

    return {
      rawMessage,
      url: `https://wa.me/${phone}?text=${encodeURIComponent(rawMessage)}`,
    }
  }

  const handleCheckout = () => {
    if (items.length === 0) return
    const { url } = getWhatsAppMessage()
    window.open(url, '_blank')
  }

  const handleCopyReceipt = () => {
    if (items.length === 0) return
    const { rawMessage } = getWhatsAppMessage()
    navigator.clipboard.writeText(rawMessage).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Slide-over Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md sm:max-w-lg bg-[#0e1614] border-l border-emerald-900/60 shadow-2xl flex flex-col justify-between text-white relative"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-emerald-900/60 bg-[#121c19] flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-heading font-semibold text-base text-white flex items-center gap-2">
                      Keranjang Pesanan
                      {totalItems > 0 && (
                        <span className="text-xs bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 font-medium px-2 py-0.5 rounded">
                          {totalItems} item
                        </span>
                      )}
                    </h2>
                    <p className="text-xs text-gray-400 font-normal">AquaSpace Studio</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-900 hover:bg-emerald-900 hover:text-white flex items-center justify-center text-gray-300 transition-colors"
                  aria-label="Tutup Keranjang"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
                {items.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-900 flex items-center justify-center text-emerald-600 mb-4">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-white mb-1.5">
                      Keranjang Belum Terisi
                    </h3>
                    <p className="text-xs text-gray-400 max-w-xs mb-6 font-normal">
                      Pilih produk dari katalog untuk memulai pemesanan.
                    </p>
                    <a
                      href="#catalog"
                      onClick={() => setIsCartOpen(false)}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 rounded-lg transition-colors"
                    >
                      <span>Buka Katalog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : (
                  <>
                    {/* Nota Reference Card */}
                    <div className="rounded-lg bg-[#121c19] border border-emerald-900/70 p-4 font-mono text-xs">
                      <div className="flex items-center justify-between text-gray-300 mb-2">
                        <span className="text-gray-400">No. Nota</span>
                        <span className="text-emerald-400 font-semibold">#{invoiceId}</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-300 text-[11px]">
                        <span className="text-gray-400">Tanggal</span>
                        <span>{getCurrentDateFormatted()}</span>
                      </div>
                    </div>

                    {/* Customer Info Form */}
                    <div className="rounded-lg bg-[#121c19] border border-emerald-900/70 p-4">
                      <div
                        onClick={() => setShowCustomerForm(!showCustomerForm)}
                        className="flex items-center justify-between cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-xs font-semibold text-gray-200">
                            Data Pemesan (Opsional)
                          </span>
                        </div>
                        <span className="text-xs text-emerald-400 hover:underline">
                          {showCustomerForm ? 'Sembunyikan' : customerDetails.name ? customerDetails.name : 'Ubah Data'}
                        </span>
                      </div>

                      {showCustomerForm && (
                        <div className="mt-4 space-y-3 pt-3 border-t border-emerald-900/60 text-xs">
                          <div>
                            <label className="block text-gray-300 font-medium mb-1">
                              Nama Lengkap
                            </label>
                            <input
                              type="text"
                              value={customerDetails.name}
                              onChange={(e) => updateCustomerDetails({ name: e.target.value })}
                              placeholder="Contoh: Budi Santoso"
                              className="w-full bg-[#0a110f] border border-emerald-900 rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-gray-300 font-medium mb-1">
                                Nomor WhatsApp
                              </label>
                              <input
                                type="tel"
                                value={customerDetails.phone}
                                onChange={(e) => updateCustomerDetails({ phone: e.target.value })}
                                placeholder="Contoh: 08123456789"
                                className="w-full bg-[#0a110f] border border-emerald-900 rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-300 font-medium mb-1">
                                Kota / Wilayah
                              </label>
                              <input
                                type="text"
                                value={customerDetails.address}
                                onChange={(e) => updateCustomerDetails({ address: e.target.value })}
                                placeholder="Contoh: Bandung"
                                className="w-full bg-[#0a110f] border border-emerald-900 rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-gray-300 font-medium mb-1">
                              Catatan Tambahan
                            </label>
                            <input
                              type="text"
                              value={customerDetails.notes}
                              onChange={(e) => updateCustomerDetails({ notes: e.target.value })}
                              placeholder="Contoh: Pengiriman hari Sabtu"
                              className="w-full bg-[#0a110f] border border-emerald-900 rounded px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Cart Items List */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                          Daftar Barang
                        </h4>
                        <button
                          onClick={clearCart}
                          className="text-xs text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Hapus Semua
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {items.map(({ product, quantity }) => {
                          const itemTotal = product.price * quantity
                          return (
                            <div
                              key={product.id}
                              className="rounded-lg bg-[#121c19] border border-emerald-900/60 p-3 flex gap-3 items-center"
                            >
                              {/* Product Thumbnail */}
                              <div className="relative w-14 h-14 rounded overflow-hidden bg-black/40 flex-shrink-0 border border-emerald-950">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0 text-xs">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <span className="text-[10px] uppercase text-emerald-400 font-medium block">
                                      {product.categoryLabel}
                                    </span>
                                    <h5 className="font-medium text-white truncate">
                                      {product.name}
                                    </h5>
                                  </div>
                                  <button
                                    onClick={() => removeFromCart(product.id)}
                                    className="text-gray-500 hover:text-rose-400 transition-colors p-1"
                                    aria-label={`Hapus ${product.name}`}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-950">
                                  {/* Quantity Controls */}
                                  <div className="flex items-center gap-1.5 bg-[#0a110f] border border-emerald-900 rounded px-1.5 py-0.5">
                                    <button
                                      onClick={() => updateQuantity(product.id, quantity - 1)}
                                      className="text-gray-400 hover:text-white transition-colors p-0.5"
                                      aria-label="Kurangi"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="font-mono font-medium text-white px-1.5">
                                      {quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(product.id, quantity + 1)}
                                      className="text-gray-400 hover:text-white transition-colors p-0.5"
                                      aria-label="Tambah"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>

                                  {/* Subtotal */}
                                  <div className="text-right font-mono">
                                    <span className="text-white font-semibold">
                                      {formatCurrency(itemTotal)}
                                    </span>
                                    <span className="block text-[10px] text-gray-400">
                                      @{product.priceLabel}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Receipt Summary */}
                    <div className="rounded-lg bg-[#121c19] border border-emerald-900/70 p-4 space-y-2 text-xs">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal Item</span>
                        <span className="font-mono text-white font-medium">{formatCurrency(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Ongkos Kirim</span>
                        <span className="text-gray-400">Konfirmasi via WA</span>
                      </div>

                      <div className="border-t border-emerald-900/60 my-2 pt-2 flex justify-between items-baseline">
                        <span className="font-semibold text-gray-200">Total Pembayaran</span>
                        <span className="text-base font-mono font-bold text-emerald-400">
                          {formatCurrency(totalPrice)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer / Actions */}
              {items.length > 0 && (
                <div className="p-5 border-t border-emerald-900/60 bg-[#121c19] space-y-2.5 sticky bottom-0 z-10">
                  {/* WhatsApp Direct Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Lanjutkan Checkout ke WhatsApp</span>
                  </button>

                  {/* Copy Receipt Button */}
                  <button
                    onClick={handleCopyReceipt}
                    className="w-full flex items-center justify-center gap-2 bg-[#0a110f] hover:bg-emerald-950 border border-emerald-900 text-gray-300 hover:text-white font-medium text-xs py-2 px-3 rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Rincian Nota Berhasil Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                        <span>Salin Rincian Pesanan</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
