"use client"

import { useLanguage } from "@/hooks/use-language"
import { Trash2, Edit2 } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalPurchases?: number
  lastPurchase?: string
}

interface CustomersKanbanViewProps {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

export default function CustomersKanbanView({ customers, onEdit, onDelete }: CustomersKanbanViewProps) {
  const { t } = useLanguage()

  const vip = customers.filter((c) => (c.totalPurchases || 0) > 10)
  const regular = customers.filter((c) => (c.totalPurchases || 0) > 0 && (c.totalPurchases || 0) <= 10)
  const new_customers = customers.filter((c) => !c.totalPurchases || c.totalPurchases === 0)

  const Column = ({ title, items, color }: { title: string; items: Customer[]; color: string }) => (
    <div className="flex-1 bg-gray-50 rounded-lg p-4 border-l-4" style={{ borderLeftColor: color }}>
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
        {title} ({items.length})
      </h3>
      <div className="space-y-3">
        {items.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{customer.name}</p>
                <p className="text-xs text-gray-600 mt-1">{customer.email}</p>
                <p className="text-xs text-gray-500 mt-1">{customer.phone}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => onEdit(customer)} className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => onDelete(customer)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      <Column title="VIP" items={vip} color="#e30074" />
      <Column title="Regular" items={regular} color="#3b82f6" />
      <Column title="New" items={new_customers} color="#8b5cf6" />
    </div>
  )
}
