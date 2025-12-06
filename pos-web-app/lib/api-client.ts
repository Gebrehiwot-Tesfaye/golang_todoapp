const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>
}

async function apiCall<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || `API Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error)
    // Return empty array/object for graceful degradation
    if (endpoint.includes("products") || endpoint.includes("orders") || endpoint.includes("customers")) {
      return [] as T
    }
    throw error
  }
}

// Product API
export async function getProducts() {
  return apiCall<any[]>("/products")
}

export async function getProduct(id: string) {
  return apiCall<any>(`/products/${id}`)
}

export async function createProduct(product: any) {
  return apiCall<any>("/products", {
    method: "POST",
    body: JSON.stringify(product),
  })
}

export async function updateProduct(id: string, product: any) {
  return apiCall<any>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  })
}

export async function deleteProduct(id: string) {
  return apiCall<any>(`/products/${id}`, {
    method: "DELETE",
  })
}

// Order API
export async function getOrders() {
  return apiCall<any[]>("/orders")
}

export async function getOrder(id: string) {
  return apiCall<any>(`/orders/${id}`)
}

export async function createOrder(order: any) {
  return apiCall<any>("/orders", {
    method: "POST",
    body: JSON.stringify(order),
  })
}

// Customer API
export async function getCustomers() {
  return apiCall<any[]>("/customers")
}

export async function getCustomer(id: string) {
  return apiCall<any>(`/customers/${id}`)
}

export async function createCustomer(customer: any) {
  return apiCall<any>("/customers", {
    method: "POST",
    body: JSON.stringify(customer),
  })
}

export async function updateCustomer(id: string, customer: any) {
  return apiCall<any>(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(customer),
  })
}

export async function deleteCustomer(id: string) {
  return apiCall<any>(`/customers/${id}`, {
    method: "DELETE",
  })
}

// Health Check
export async function checkHealth() {
  return apiCall<{ status: string }>("/health")
}
