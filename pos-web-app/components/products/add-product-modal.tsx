"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface AddProductModalProps {
  onClose: () => void
  onAdd: (product: any) => void
}

export default function AddProductModal({ onClose, onAdd }: AddProductModalProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Beverages",
    stock: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.price && formData.stock) {
      onAdd({
        name: formData.name,
        price: Number.parseFloat(formData.price),
        category: formData.category,
        stock: Number.parseInt(formData.stock),
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border-color">
          <h2 className="text-2xl font-bold text-foreground">{t("addProduct")}</h2>
          <button onClick={onClose} className="p-2 hover:bg-card-bg rounded-lg transition-colors" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">{t("name")}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">{t("price")}</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">{t("stock")}</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">{t("category")}</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option>Beverages</option>
              <option>Accessories</option>
              <option>Equipment</option>
              <option>Supplies</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border-color rounded-lg font-semibold text-foreground hover:bg-card-bg transition-colors"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {t("addProduct")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
