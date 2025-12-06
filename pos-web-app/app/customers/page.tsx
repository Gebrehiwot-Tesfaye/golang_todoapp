"use client"

import { useState, useEffect } from "react"
import CustomersTable from "@/components/customers/customers-table"
import CustomersCardView from "@/components/customers/customers-card-view"
import CustomersKanbanView from "@/components/customers/customers-kanban-view"
import CustomersViewToggle from "@/components/customers/customers-view-toggle"
import { useLanguage } from "@/hooks/use-language"
import { getCustomers } from "@/lib/api-client"
import { Plus } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalPurchases?: number
  lastPurchase?: string
}

export default function CustomersPage() {
  const { t } = useLanguage()
  const [view, setView] = useState<"list" | "card" | "kanban">("list")
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers()
        setCustomers(data || [])
      } catch (error) {
        console.error("Error fetching customers:", error)
        // Use dummy data if API fails
        setCustomers([
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            phone: "555-0001",
            address: "123 Main St",
            totalPurchases: 5,
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "555-0002",
            address: "456 Oak Ave",
            totalPurchases: 10,
          },
          {
            id: "3",
            name: "Bob Johnson",
            email: "bob@example.com",
            phone: "555-0003",
            address: "789 Pine Rd",
            totalPurchases: 3,
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchCustomers()
  }, [])

  const handleEdit = (customer: Customer) => {
    console.log("Edit customer:", customer)
  }

  const handleDelete = (customer: Customer) => {
    setCustomers(customers.filter((c) => c.id !== customer.id))
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">{t("customers")}</h1>
        <button className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={20} />
          {t("newCustomer")}
        </button>
      </div>

      <div className="mb-6">
        <CustomersViewToggle currentView={view} onViewChange={setView} />
      </div>

      {loading ? (
        <div className="text-center py-12">{t("loading")}</div>
      ) : (
        <>
          {view === "list" && <CustomersTable />}
          {view === "card" && <CustomersCardView customers={customers} onEdit={handleEdit} onDelete={handleDelete} />}
          {view === "kanban" && (
            <CustomersKanbanView customers={customers} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </>
      )}
    </div>
  )
}
