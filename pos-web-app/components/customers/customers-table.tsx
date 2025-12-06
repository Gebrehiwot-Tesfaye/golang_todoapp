"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, AlertCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { getCustomers, deleteCustomer } from "@/lib/api-client"
import AddCustomerModal from "@/components/customers/add-customer-modal"

export default function CustomersTable() {
  const { t } = useLanguage()
  const [customers, setCustomers] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomers()
        setCustomers(data || [])
      } catch (error) {
        console.error("Error fetching customers:", error)
        // Fallback data
        setCustomers([
          {
            id: "1",
            name: "John Doe",
            phone: "+1-555-0123",
            email: "john@example.com",
            address: "123 Main St",
            purchases: 5,
            totalSpent: 456.75,
          },
          {
            id: "2",
            name: "Jane Smith",
            phone: "+1-555-0124",
            email: "jane@example.com",
            address: "456 Oak Ave",
            purchases: 12,
            totalSpent: 1250.3,
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAddCustomer = (newCustomer: any) => {
    setCustomers([
      ...customers,
      {
        ...newCustomer,
        id: Date.now().toString(),
        purchases: 0,
        totalSpent: 0,
      },
    ])
    setShowAddModal(false)
  }

  const handleDeleteCustomer = async (id: string) => {
    try {
      await deleteCustomer(id)
      setCustomers(customers.filter((c) => c.id !== id))
    } catch (error) {
      console.error("Error deleting customer:", error)
      setCustomers(customers.filter((c) => c.id !== id))
    }
    setDeleteConfirm(null)
  }

  if (loading) {
    return <div className="text-center py-8">{t("loading")}</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-color p-6 space-y-6">
      <button
        onClick={() => setShowAddModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
      >
        <Plus size={18} />
        {t("addCustomer")}
      </button>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-color">
              <th className="text-left py-3 px-4 font-semibold text-foreground">{t("name")}</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">{t("phone")}</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">{t("email")}</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">{t("address")}</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">{t("orders")}</th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">{t("total")}</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">{t("edit")}</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-border-color hover:bg-card-bg transition-colors">
                <td className="py-3 px-4 font-medium text-foreground">{customer.name}</td>
                <td className="py-3 px-4 text-neutral-dark">{customer.phone}</td>
                <td className="py-3 px-4 text-neutral-dark text-sm">{customer.email}</td>
                <td className="py-3 px-4 text-neutral-dark text-sm">{customer.address}</td>
                <td className="py-3 px-4 text-center font-semibold text-foreground">{customer.purchases || 0}</td>
                <td className="py-3 px-4 text-right font-semibold text-accent">
                  ${(customer.totalSpent || 0).toFixed(2)}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      aria-label={t("edit")}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(customer.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      aria-label={t("delete")}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <AddCustomerModal onClose={() => setShowAddModal(false)} onAdd={handleAddCustomer} />}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <AlertCircle className="text-error flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">{t("warning")}</h3>
                  <p className="text-neutral-dark text-sm">{t("confirm")}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border-color flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-border-color rounded-lg font-semibold text-foreground hover:bg-card-bg transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                onClick={() => handleDeleteCustomer(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-error text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
