"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { updateProduct } from "@/lib/api-client"

interface EditProductModalProps {
  product: any
  onClose: () => void
  onUpdate: (product: any) => void
}

export default function EditProductModal({ product, onClose, onUpdate }: EditProductModalProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState(product)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateProduct(product.id, {
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      })
      onUpdate({
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      })
    } catch (error) {
      console.error("Error updating product:", error)
      onUpdate({
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border-color">
          <h2 className="text-2xl font-bold text-foreground">{t("editProduct")}</h2>
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
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">{t("stock")}</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
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
              disabled={loading}
              className="flex-1 px-4 py-2 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? t("loading") : t("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
