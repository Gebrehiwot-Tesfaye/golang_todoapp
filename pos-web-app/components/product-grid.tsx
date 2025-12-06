"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import ProductCard from "@/components/pos/product-card"

const PRODUCTS = [
  { id: "1", name: "Coffee Beans", price: 12.99, category: "Beverages", image: "/pile-of-coffee-beans.png" },
  { id: "2", name: "Espresso Cup", price: 8.49, category: "Accessories", image: "/espresso-cup.jpg" },
  { id: "3", name: "Tea Leaves", price: 6.99, category: "Beverages", image: "/loose-tea-leaves.png" },
  { id: "4", name: "Milk Frother", price: 34.99, category: "Equipment", image: "/milk-frother.jpg" },
  { id: "5", name: "Sugar Cubes", price: 3.99, category: "Supplies", image: "/sugar-cubes.jpg" },
  { id: "6", name: "Coffee Filters", price: 4.49, category: "Supplies", image: "/coffee-filters.png" },
]

const CATEGORIES = ["All", "Beverages", "Accessories", "Equipment", "Supplies"]

interface ProductGridProps {
  onAddToCart: (product: any) => void
}

export default function ProductGrid({ onAddToCart }: ProductGridProps) {
  const { t } = useLanguage()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === "All" || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category])

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-3 text-neutral-dark" />
          <input
            type="text"
            placeholder={t("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              category === cat ? "bg-accent text-white" : "bg-card-bg text-foreground hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={() => onAddToCart(product)} />
          ))}
        </div>
      </div>
    </div>
  )
}
