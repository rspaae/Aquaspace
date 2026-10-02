'use client'

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react'
import { ProductItem } from '@/data/products'

export interface CartItem {
  product: ProductItem
  quantity: number
  customNotes?: string
}

export interface CustomerDetails {
  name: string
  phone: string
  address: string
  notes: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: ProductItem, quantity?: number, openCart?: boolean) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  toggleCart: () => void
  customerDetails: CustomerDetails
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void
  lastAddedItem: ProductItem | null
  invoiceId: string
  generateNewInvoiceId: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'aquaspace_cart_v1'
const CUSTOMER_STORAGE_KEY = 'aquaspace_customer_v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [lastAddedItem, setLastAddedItem] = useState<ProductItem | null>(null)
  const [invoiceId, setInvoiceId] = useState<string>('')
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    notes: '',
  })

  // Generate unique invoice number
  const generateNewInvoiceId = () => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomCode = Math.floor(1000 + Math.random() * 9000)
    setInvoiceId(`AQS-${dateStr}-${randomCode}`)
  }

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
      const savedCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY)
      if (savedCustomer) {
        setCustomerDetails(JSON.parse(savedCustomer))
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e)
    }
    generateNewInvoiceId()
    setIsHydrated(true)
  }, [])

  // Sync to LocalStorage on changes
  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error('Failed to save cart to localStorage', e)
    }
  }, [items, isHydrated])

  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerDetails))
    } catch (e) {
      console.error('Failed to save customer details to localStorage', e)
    }
  }, [customerDetails, isHydrated])

  const addToCart = (product: ProductItem, quantity: number = 1, openCart: boolean = true) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id)
      if (existingIndex > -1) {
        const updated = [...prevItems]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        }
        return updated
      } else {
        return [...prevItems, { product, quantity }]
      }
    })

    setLastAddedItem(product)
    if (openCart) {
      setIsCartOpen(true)
    }
  }

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    generateNewInvoiceId()
  }

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev)
  }

  const updateCustomerDetails = (details: Partial<CustomerDetails>) => {
    setCustomerDetails((prev) => ({ ...prev, ...details }))
  }

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        customerDetails,
        updateCustomerDetails,
        lastAddedItem,
        invoiceId,
        generateNewInvoiceId,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
