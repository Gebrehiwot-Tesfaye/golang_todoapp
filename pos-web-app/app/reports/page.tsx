"use client"

import SalesChart from "@/components/reports/sales-chart"
import ReportsSummary from "@/components/reports/reports-summary"
import { useLanguage } from "@/hooks/use-language"

export default function ReportsPage() {
  const { t } = useLanguage()

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">{t("reports")}</h1>
      <ReportsSummary />
      <SalesChart />
    </div>
  )
}
