"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { createCustomer } from "@/lib/api-client"

interface AddCustomerModalProps {
  onClose: () => void
  onAdd: (customer: any) => void
}

export default function AddCustomerModal({ onClose, onAdd }: AddCustomerModalProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.phone) {
      setLoading(true)
      try {
        await createCustomer(formData)
        onAdd(formData)
      } catch (error) {
        console.error("Error creating customer:", error)
        onAdd(formData)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border-color">
          <h2 className="text-2xl font-bold text-foreground">{t("addCustomer")}</h2>
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

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">{t("phone")}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">{t("email")}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">{t("address")}</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
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
              {loading ? t("loading") : t("addCustomer")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
