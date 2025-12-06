# POS System Backend API

A RESTful API built with Go and Gorilla Mux for the Point of Sale system.

## Features

- Product management (list, create, retrieve)
- Order processing with payment tracking
- Customer management and tracking
- In-memory data storage (use database for production)
- CORS support for cross-origin requests
- Health check endpoint

## Getting Started

### Prerequisites

- Go 1.21 or higher
- Basic understanding of REST APIs

### Installation

1. Navigate to the go-backend directory:
\`\`\`bash
cd go-backend
\`\`\`

2. Install dependencies:
\`\`\`bash
go mod download
\`\`\`

3. Run the server:
\`\`\`bash
go run main.go
\`\`\`

The API will be available at `http://localhost:8080`

## API Endpoints

### Health Check
- **GET** `/api/health` - Check API status

### Products
- **GET** `/api/products` - List all products
- **GET** `/api/products/{id}` - Get product by ID
- **POST** `/api/products` - Create new product
  - Body: `{ "name": "Coffee", "price": 12.99, "category": "Beverages", "stock": 100 }`

### Orders
- **GET** `/api/orders` - List all orders
- **POST** `/api/orders` - Create new order
  - Body: 
  \`\`\`json
  {
    "customer_id": "1",
    "items": [
      { "product_id": "1", "quantity": 2, "price": 12.99 }
    ],
    "total": 25.98,
    "tax": 2.60,
    "payment_method": "Card"
  }
  \`\`\`

### Customers
- **GET** `/api/customers` - List all customers
- **GET** `/api/customers/{id}` - Get customer by ID
- **POST** `/api/customers` - Create new customer
  - Body: `{ "name": "John Doe", "phone": "+1-555-0123", "email": "john@example.com", "address": "123 Main St" }`

## Example Usage

### Get all products
\`\`\`bash
curl http://localhost:8080/api/products
\`\`\`

### Create a new product
\`\`\`bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Espresso","price":4.99,"category":"Beverages","stock":200}'
\`\`\`

### Create a new order
\`\`\`bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": "1",
    "items": [{"product_id": "1", "quantity": 2, "price": 12.99}],
    "total": 25.98,
    "tax": 2.60,
    "payment_method": "Card"
  }'
\`\`\`

### Create a new customer
\`\`\`bash
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","phone":"+1-555-0124","email":"jane@example.com","address":"456 Oak Ave"}'
\`\`\`

## Docker Support

### Build Docker image
\`\`\`bash
docker build -t pos-api .
\`\`\`

### Run Docker container
\`\`\`bash
docker run -p 8080:8080 pos-api
\`\`\`

## Production Deployment

For production use:

1. Replace in-memory storage with a database (PostgreSQL, MySQL, MongoDB)
2. Add authentication and authorization
3. Implement request validation and error handling
4. Add database migrations
5. Use environment variables for configuration
6. Add logging and monitoring
7. Implement rate limiting

## Database Schema (PostgreSQL Example)

\`\`\`sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id VARCHAR(50) PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  total DECIMAL(10, 2),
  tax DECIMAL(10, 2),
  payment_method VARCHAR(50),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT,
  price DECIMAL(10, 2)
);
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
