"use client"
import { ShoppingCart } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image: string
  }
  onAdd: () => void
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const { t } = useLanguage()

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-border-color overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onAdd}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onAdd()
        }
      }}
    >
      <div className="relative overflow-hidden h-40 bg-card-bg">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-accent">${product.price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onAdd()
            }}
            className="p-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity"
            aria-label={`${t("addProduct")} ${product.name}`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
