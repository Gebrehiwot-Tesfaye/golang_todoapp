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

interface ProductsCardViewProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export default function ProductsCardView({ products, onEdit, onDelete }: ProductsCardViewProps) {
  const { t } = useLanguage()

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t("noData")}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="h-40 bg-gradient-to-br from-accent to-pink-500 flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-white text-4xl font-bold">{product.name.charAt(0)}</div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.category}</p>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-accent">${product.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500">
                  {t("stock")}: {product.stock}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(product)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
