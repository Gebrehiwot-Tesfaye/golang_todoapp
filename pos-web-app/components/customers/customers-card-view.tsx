"use client"

import { useLanguage } from "@/hooks/use-language"
import { Trash2, Edit2, Mail, Phone } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalPurchases?: number
  lastPurchase?: string
}

interface CustomersCardViewProps {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

export default function CustomersCardView({ customers, onEdit, onDelete }: CustomersCardViewProps) {
  const { t } = useLanguage()

  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t("noData")}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow p-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold">
              {customer.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{customer.name}</h3>
              <p className="text-sm text-gray-500">{customer.address}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={14} />
              {customer.email}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={14} />
              {customer.phone}
            </div>
            {customer.totalPurchases !== undefined && (
              <div className="text-gray-600">
                {t("total")} {t("orders")}: {customer.totalPurchases}
              </div>
            )}
          </div>
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={() => onEdit(customer)}
              className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors flex items-center justify-center gap-2"
            >
              <Edit2 size={16} />
              {t("edit")}
            </button>
            <button
              onClick={() => onDelete(customer)}
              className="flex-1 py-2 text-red-600 hover:bg-red-50 rounded transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              {t("delete")}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
