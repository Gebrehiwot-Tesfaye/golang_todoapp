"use client"

import { useLanguage } from "@/hooks/use-language"
import { Trash2, Edit2 } from "lucide-react"

interface Product {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  category: string
  image?: string
}

interface ProductsKanbanViewProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export default function ProductsKanbanView({ products, onEdit, onDelete }: ProductsKanbanViewProps) {
  const { t } = useLanguage()

  const inStock = products.filter((p) => p.stock > 10)
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10)
  const outOfStock = products.filter((p) => p.stock === 0)

  const Column = ({ title, items, color }: { title: string; items: Product[]; color: string }) => (
    <div className="flex-1 bg-gray-50 rounded-lg p-4 border-l-4" style={{ borderLeftColor: color }}>
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
        {title} ({items.length})
      </h3>
      <div className="space-y-3">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm line-clamp-2">{product.name}</p>
                <p className="text-xs text-gray-600 mt-1">${product.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {t("stock")}: {product.stock}
                </p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => onEdit(product)} className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => onDelete(product)} className="p-1 text-red-600 hover:bg-red-50 rounded">
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
      <Column title="In Stock" items={inStock} color="#10b981" />
      <Column title="Low Stock" items={lowStock} color="#f59e0b" />
      <Column title="Out of Stock" items={outOfStock} color="#ef4444" />
    </div>
  )
}
