"use client"

import { LayoutList, LayoutGrid, Grid3x3 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface ViewToggleProps {
  currentView: "list" | "card" | "kanban"
  onViewChange: (view: "list" | "card" | "kanban") => void
}

export default function ProductsViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  const { t } = useLanguage()

  return (
    <div className="flex gap-2 border rounded-lg p-1 bg-gray-50">
      <button
        onClick={() => onViewChange("list")}
        className={`p-2 rounded transition-colors flex items-center gap-2 ${
          currentView === "list" ? "bg-accent text-white" : "text-gray-600 hover:bg-gray-200"
        }`}
        title={t("list")}
      >
        <LayoutList size={18} />
      </button>
      <button
        onClick={() => onViewChange("card")}
        className={`p-2 rounded transition-colors flex items-center gap-2 ${
          currentView === "card" ? "bg-accent text-white" : "text-gray-600 hover:bg-gray-200"
        }`}
        title={t("card")}
      >
        <LayoutGrid size={18} />
      </button>
      <button
        onClick={() => onViewChange("kanban")}
        className={`p-2 rounded transition-colors flex items-center gap-2 ${
          currentView === "kanban" ? "bg-accent text-white" : "text-gray-600 hover:bg-gray-200"
        }`}
        title={t("kanban")}
      >
        <Grid3x3 size={18} />
      </button>
    </div>
  )
}
