"use client"

import { useState } from "react"
import { Filter, Download } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const ORDERS = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    customer: "John Doe",
    amount: 125.5,
    method: "Card",
    status: "Completed",
  },
  {
    id: "ORD-002",
    date: "2024-01-14",
    customer: "Jane Smith",
    amount: 89.99,
    method: "Cash",
    status: "Completed",
  },
  {
    id: "ORD-003",
    date: "2024-01-14",
    customer: "Bob Johnson",
    amount: 156.3,
    method: "Mobile",
    status: "Pending",
  },
]

export default function OrdersTable() {
  const { t } = useLanguage()
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterMethod, setFilterMethod] = useState("All")

  const filtered = ORDERS.filter((order) => {
    const statusMatch = filterStatus === "All" || order.status === filterStatus
    const methodMatch = filterMethod === "All" || order.method === filterMethod
    return statusMatch && methodMatch
  })

  const statusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-color p-6 space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-neutral-dark" />
          <span className="font-medium text-foreground">{t("filter")}:</span>
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>

        <select
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          className="px-3 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="All">All Methods</option>
          <option value="Cash">{t("cash")}</option>
          <option value="Card">{t("card")}</option>
          <option value="Mobile">{t("mobile")}</option>
        </select>

        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-medium ml-auto">
          <Download size={18} />
          {t("export")}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-color">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Order ID</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">{t("customers")}</th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">{t("total")}</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">{t("paymentMethod")}</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-border-color hover:bg-card-bg transition-colors">
                <td className="py-3 px-4 font-medium text-accent">{order.id}</td>
                <td className="py-3 px-4 text-foreground">{order.date}</td>
                <td className="py-3 px-4 text-foreground">{order.customer}</td>
                <td className="py-3 px-4 text-right font-semibold text-foreground">${order.amount.toFixed(2)}</td>
                <td className="py-3 px-4 text-center text-sm text-neutral-dark">{order.method}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
