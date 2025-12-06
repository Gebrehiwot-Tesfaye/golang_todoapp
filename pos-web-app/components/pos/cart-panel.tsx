"use client"

import { Trash2, Plus, Minus } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartPanelProps {
  cart: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onPay: () => void
}

export default function CartPanel({ cart, onUpdateQuantity, onRemoveItem, onPay }: CartPanelProps) {
  const { t } = useLanguage()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="w-96 bg-white rounded-lg shadow-lg border border-border-color flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border-color">
        <h2 className="text-xl font-bold text-foreground">Cart</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.length === 0 ? (
          <p className="text-neutral-dark text-center py-8">{t("noData")}</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-card-bg rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                <p className="text-accent font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2 bg-white rounded-lg border border-border-color">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:bg-card-bg"
                  aria-label={t("quantity")}
                >
                  <Minus size={16} className="text-foreground" />
                </button>
                <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-card-bg"
                  aria-label={t("quantity")}
                >
                  <Plus size={16} className="text-foreground" />
                </button>
              </div>

              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-error"
                aria-label={t("delete")}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-border-color space-y-3 bg-card-bg">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-dark">{t("subtotal")}:</span>
          <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-dark">{t("tax")} (10%):</span>
          <span className="font-semibold text-foreground">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg pt-2 border-t border-border-color">
          <span className="font-bold text-foreground">{t("total")}:</span>
          <span className="font-bold text-accent text-xl">${total.toFixed(2)}</span>
        </div>

        <button
          onClick={onPay}
          disabled={cart.length === 0}
          className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("payment")}
        </button>
      </div>
    </div>
  )
}
