"use client"

import OrdersTable from "@/components/orders/orders-table"
import { useLanguage } from "@/hooks/use-language"

export default function OrdersPage() {
  const { t } = useLanguage()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-foreground mb-6">{t("orders")}</h1>
      <OrdersTable />
    </div>
  )
}
