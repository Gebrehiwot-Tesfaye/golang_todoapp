"use client"

import { useState, useEffect } from "react"
import ProductsTable from "@/components/products/products-table"
import ProductsCardView from "@/components/products/products-card-view"
import ProductsKanbanView from "@/components/products/products-kanban-view"
import ProductsViewToggle from "@/components/products/products-view-toggle"
import { useLanguage } from "@/hooks/use-language"
import { getProducts } from "@/lib/api-client"
import { Plus } from "lucide-react"

interface Product {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  category: string
  image?: string
}

export default function ProductsPage() {
  const { t } = useLanguage()
  const [view, setView] = useState<"list" | "card" | "kanban">("list")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
        // Use dummy data if API fails
        setProducts([
          {
            id: "1",
            name: "Laptop",
            price: 999,
            stock: 5,
            category: "Electronics",
            description: "High-performance laptop",
          },
          { id: "2", name: "Mouse", price: 29, stock: 50, category: "Electronics", description: "Wireless mouse" },
          {
            id: "3",
            name: "Keyboard",
            price: 79,
            stock: 0,
            category: "Electronics",
            description: "Mechanical keyboard",
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleEdit = (product: Product) => {
    console.log("Edit product:", product)
  }

  const handleDelete = (product: Product) => {
    setProducts(products.filter((p) => p.id !== product.id))
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">{t("products")}</h1>
        <button className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={20} />
          {t("newProduct")}
        </button>
      </div>

      <div className="mb-6">
        <ProductsViewToggle currentView={view} onViewChange={setView} />
      </div>

      {loading ? (
        <div className="text-center py-12">{t("loading")}</div>
      ) : (
        <>
          {view === "list" && <ProductsTable />}
          {view === "card" && <ProductsCardView products={products} onEdit={handleEdit} onDelete={handleDelete} />}
          {view === "kanban" && <ProductsKanbanView products={products} onEdit={handleEdit} onDelete={handleDelete} />}
        </>
      )}
    </div>
  )
}
