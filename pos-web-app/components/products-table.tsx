"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, AlertCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { getProducts, deleteProduct } from "@/lib/api-client"
import AddProductModal from "@/components/products/add-product-modal"
import EditProductModal from "@/components/products/edit-product-modal"

export default function ProductsTable() {
  const { t } = useLanguage()
  const [products, setProducts] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts()
        setProducts(data || [])
      } catch (error) {
        console.error("Error fetching products:", error)
        // Fallback data
        setProducts([
          { id: "1", name: "Coffee Beans", price: 12.99, category: "Beverages", stock: 150 },
          { id: "2", name: "Espresso Cup", price: 8.49, category: "Accessories", stock: 45 },
          { id: "3", name: "Tea Leaves", price: 6.99, category: "Beverages", stock: 200 },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAddProduct = (newProduct: any) => {
    setProducts([...products, { ...newProduct, id: Date.now().toString() }])
    setShowAddModal(false)
  }

  const handleUpdateProduct = (updatedProduct: any) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
    setEditingProduct(null)
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id)
      setProducts(products.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error deleting product:", error)
      setProducts(products.filter((p) => p.id !== id))
    }
    setDeleteConfirm(null)
  }

  if (loading) {
    return <div className="text-center py-8">{t("loading")}</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-color p-6 space-y-6">
      <button
        onClick={() => setShowAddModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
      >
        <Plus size={18} />
        {t("addProduct")}
      </button>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-color">
              <th className="text-left py-3 px-4 font-semibold text-foreground">{t("name")}</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">{t("category")}</th>
              <th className="text-right py-3 px-4 font-semibold text-foreground">{t("price")}</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">{t("stock")}</th>
              <th className="text-center py-3 px-4 font-semibold text-foreground">{t("edit")}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border-color hover:bg-card-bg transition-colors">
                <td className="py-3 px-4 font-medium text-foreground">{product.name}</td>
                <td className="py-3 px-4 text-neutral-dark text-sm">{product.category}</td>
                <td className="py-3 px-4 text-right font-semibold text-accent">${product.price.toFixed(2)}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock < 50 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                      aria-label={t("edit")}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(product.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      aria-label={t("delete")}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} onAdd={handleAddProduct} />}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={handleUpdateProduct}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <AlertCircle className="text-error flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">{t("deleteProduct")}?</h3>
                  <p className="text-neutral-dark text-sm">{t("warning")}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border-color flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-border-color rounded-lg font-semibold text-foreground hover:bg-card-bg transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-error text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                {t("delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
