"use client"

import { useState } from "react"
import { X, DollarSign, CreditCard, Smartphone } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface PaymentModalProps {
  cart: CartItem[]
  onClose: () => void
  onConfirm: () => void
}

export default function PaymentModal({ cart, onClose, onConfirm }: PaymentModalProps) {
  const { t } = useLanguage()
  const [method, setMethod] = useState<"cash" | "card" | "mobile">("cash")
  const [amountGiven, setAmountGiven] = useState("")

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax
  const change = amountGiven ? Number.parseFloat(amountGiven) - total : 0

  const paymentMethods = [
    { id: "cash", label: t("cash"), icon: DollarSign },
    { id: "card", label: t("card"), icon: CreditCard },
    { id: "mobile", label: t("mobile"), icon: Smartphone },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border-color">
          <h2 className="text-2xl font-bold text-foreground">{t("payment")}</h2>
          <button onClick={onClose} className="p-2 hover:bg-card-bg rounded-lg transition-colors" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-neutral-dark">
              <span>{t("total")}:</span>
              <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">{t("paymentMethod")}</label>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setMethod(id as any)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                    method === id ? "border-accent bg-accent bg-opacity-10" : "border-border-color hover:border-accent"
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {method === "cash" && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                {t("cash")} {t("total")}
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={amountGiven}
                onChange={(e) => setAmountGiven(e.target.value)}
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                step="0.01"
                min="0"
              />
              {change > 0 && (
                <div className="flex justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-green-800">{t("change")}:</span>
                  <span className="text-sm font-bold text-success">${change.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border-color flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border-color rounded-lg font-semibold text-foreground hover:bg-card-bg transition-colors"
          >
            {t("cancel")}
          </button>
          <button
            onClick={onConfirm}
            disabled={method === "cash" && (!amountGiven || Number.parseFloat(amountGiven) < total)}
            className="flex-1 px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("confirm")} {t("payment")}
          </button>
        </div>
      </div>
    </div>
  )
}
