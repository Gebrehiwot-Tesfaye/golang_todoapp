# POS System Frontend-Backend Integration Guide

This guide explains how to integrate the Next.js frontend with the Go backend API.

## Table of Contents

1. [Setup](#setup)
2. [Environment Configuration](#environment-configuration)
3. [API Integration](#api-integration)
4. [Implementing API Calls](#implementing-api-calls)
5. [Error Handling](#error-handling)
6. [Testing](#testing)
7. [Deployment](#deployment)

## Setup

### Prerequisites

- Node.js 18+ installed
- Go 1.21+ installed
- Both frontend and backend running locally or deployed

### Installation Steps

#### Backend Setup

1. Navigate to the Go backend directory:
\`\`\`bash
cd go-backend
\`\`\`

2. Install dependencies:
\`\`\`bash
go mod download
\`\`\`

3. Run the backend server:
\`\`\`bash
go run main.go
\`\`\`

The backend will start on `http://localhost:8080`

#### Frontend Setup

1. Navigate to the frontend directory:
\`\`\`bash
cd next-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment variables:
\`\`\`bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
\`\`\`

4. Run the frontend:
\`\`\`bash
npm run dev
\`\`\`

The frontend will start on `http://localhost:3000`

## Environment Configuration

### Frontend Environment Variables

Create a `.env.local` file in the root of your Next.js project:

\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# For production
# NEXT_PUBLIC_API_URL=https://api.yourpos.com/api
\`\`\`

### Backend CORS Configuration

The backend is already configured to accept requests from localhost:3000. For production, update the CORS allowed origins in `main.go`:

\`\`\`go
handler := handlers.CORS(
    handlers.AllowedOrigins([]string{"https://yourfrontend.com", "https://www.yourfrontend.com"}),
    handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
    handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
)(router)
\`\`\`

## API Integration

### Using the API Client

The project includes a pre-built API client in `lib/api-client.ts` that handles all communication with the backend.

#### Example: Getting Products

\`\`\`typescript
import { getProducts } from '@/lib/api-client'

// In a React component
const [products, setProducts] = useState([])

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  fetchProducts()
}, [])
\`\`\`

#### Example: Creating an Order

\`\`\`typescript
import { createOrder } from '@/lib/api-client'

const handleCheckout = async (cartItems, paymentMethod) => {
  try {
    const order = {
      customer_id: "1",
      items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      tax: 0, // Calculate based on tax rate from settings
      payment_method: paymentMethod
    }

    const result = await createOrder(order)
    console.log('Order created:', result)
    // Clear cart and redirect
  } catch (error) {
    console.error('Failed to create order:', error)
  }
}
\`\`\`

## Implementing API Calls

### Step 1: Update ProductGrid Component

Replace the dummy data fetch in `components/pos/product-grid.tsx`:

\`\`\`typescript
'use client'

import { useEffect, useState } from 'react'
import { getProducts } from '@/lib/api-client'

export default function ProductGrid({ onAddToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div>Loading products...</div>
  if (error) return <div>Error: {error}</div>

  return (
    // ... existing JSX with products data
  )
}
\`\`\`

### Step 2: Update Orders Page

Replace the dummy data in `components/orders/orders-table.tsx`:

\`\`\`typescript
'use client'

import { useEffect, useState } from 'react'
import { getOrders } from '@/lib/api-client'

export default function OrdersTable() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders()
        setOrders(data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      }
    }

    fetchOrders()
  }, [])

  return (
    // ... existing JSX with orders data
  )
}
\`\`\`

### Step 3: Update Customers Page

Replace the dummy data in `components/customers/customers-table.tsx`:

\`\`\`typescript
'use client'

import { useEffect, useState } from 'react'
import { getCustomers, createCustomer } from '@/lib/api-client'

export default function CustomersTable() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers()
        setCustomers(data)
      } catch (error) {
        console.error('Failed to fetch customers:', error)
      }
    }

    fetchCustomers()
  }, [])

  const handleAddCustomer = async (newCustomer) => {
    try {
      const result = await createCustomer(newCustomer)
      setCustomers([...customers, result])
    } catch (error) {
      console.error('Failed to create customer:', error)
    }
  }

  return (
    // ... existing JSX
  )
}
\`\`\`

### Step 4: Update Products Management

Replace the dummy data in `components/products/products-table.tsx`:

\`\`\`typescript
'use client'

import { useEffect, useState } from 'react'
import { getProducts, createProduct } from '@/lib/api-client'

export default function ProductsTable() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    fetchProducts()
  }, [])

  const handleAddProduct = async (newProduct) => {
    try {
      const result = await createProduct(newProduct)
      setProducts([...products, result])
    } catch (error) {
      console.error('Failed to create product:', error)
    }
  }

  return (
    // ... existing JSX
  )
}
\`\`\`

## Error Handling

The API client includes built-in error handling. Handle errors in your components:

\`\`\`typescript
try {
  const data = await getProducts()
  setProducts(data)
} catch (error) {
  // Show user-friendly error message
  toast.error('Failed to load products. Please try again.')
  console.error(error)
}
\`\`\`

## Testing

### Test the Health Endpoint

\`\`\`bash
curl http://localhost:8080/api/health
\`\`\`

Expected response:
\`\`\`json
{"status":"ok"}
\`\`\`

### Test Creating a Product

\`\`\`bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "price": 9.99,
    "category": "Beverages",
    "stock": 100
  }'
\`\`\`

### Test Creating an Order

\`\`\`bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "1",
    "items": [
      {"product_id": "1", "quantity": 2, "price": 12.99}
    ],
    "total": 25.98,
    "tax": 2.60,
    "payment_method": "Card"
  }'
\`\`\`

## Deployment

### Frontend Deployment (Vercel)

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set environment variable:
   - \`NEXT_PUBLIC_API_URL=https://api.yourpos.com/api\`
4. Deploy

### Backend Deployment (Options)

#### Option 1: Docker on Cloud Run

\`\`\`bash
docker build -t pos-api .
docker tag pos-api gcr.io/PROJECT_ID/pos-api
docker push gcr.io/PROJECT_ID/pos-api
\`\`\`

#### Option 2: Railway or Render

1. Connect Git repository
2. Expose port 8080
3. Set environment variables for database

#### Option 3: Traditional VPS

1. Build binary: \`go build -o pos-api\`
2. Copy to server
3. Run with process manager (systemd, supervisor, etc.)

### Database Setup for Production

Replace the in-memory storage with PostgreSQL:

\`\`\`bash
# Create database
createdb pos_system

# Run migrations (create tables)
psql pos_system < migrations/001_initial.sql
\`\`\`

Update the backend to use database instead of in-memory storage.

## Troubleshooting

### CORS Errors

**Error**: \`Access to XMLHttpRequest has been blocked by CORS policy\`

**Solution**: Ensure backend CORS configuration includes your frontend URL

### Connection Refused

**Error**: \`Failed to fetch from http://localhost:8080\`

**Solution**: Ensure backend is running and environment variable is set correctly

### Slow API Responses

**Solution**: 
- Add database indexes
- Implement caching layer (Redis)
- Optimize database queries
- Consider API pagination

## Next Steps

1. Integrate with a real database (PostgreSQL, MySQL)
2. Add authentication (JWT, OAuth)
3. Implement payment gateway integration
4. Add comprehensive logging
5. Set up monitoring and alerting
6. Create automated tests
7. Deploy to production environment

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Go Web Development](https://golang.org/doc/effective_go)
- [Gorilla Mux Documentation](https://github.com/gorilla/mux)
