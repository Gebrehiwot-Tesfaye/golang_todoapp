"use client"

import { useState } from "react"
import ProductGrid from "@/components/pos/product-grid"
import CartPanel from "@/components/pos/cart-panel"
import PaymentModal from "@/components/pos/payment-modal"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function POSScreen() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showPayment, setShowPayment] = useState(false)

  const addToCart = (product: any) => {
    const existing = cart.find((item) => item.id === product.id)
    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const handlePayment = () => {
    setCart([])
    setShowPayment(false)
  }

  return (
    <div className="flex gap-6 h-full p-6">
      <div className="flex-1">
        <ProductGrid onAddToCart={addToCart} />
      </div>
      <CartPanel
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onPay={() => setShowPayment(true)}
      />

      {showPayment && <PaymentModal cart={cart} onClose={() => setShowPayment(false)} onConfirm={handlePayment} />}
    </div>
  )
}
