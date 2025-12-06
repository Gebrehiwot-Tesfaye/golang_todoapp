package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// Model Structs
type Product struct {
	ID       string  `json:"id"`
	Name     string  `json:"name"`
	Price    float64 `json:"price"`
	Category string  `json:"category"`
	Stock    int     `json:"stock"`
}

type Order struct {
	ID           string    `json:"id"`
	CustomerID   string    `json:"customer_id"`
	Items        []OrderItem `json:"items"`
	Total        float64   `json:"total"`
	Tax          float64   `json:"tax"`
	PaymentMethod string   `json:"payment_method"`
	Status       string    `json:"status"`
	CreatedAt    time.Time `json:"created_at"`
}

type OrderItem struct {
	ProductID string  `json:"product_id"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"`
}

type Customer struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	Phone      string `json:"phone"`
	Email      string `json:"email"`
	Address    string `json:"address"`
	CreatedAt  time.Time `json:"created_at"`
}

// In-memory storage (replace with database in production)
var products = []Product{
	{ID: "1", Name: "Coffee Beans", Price: 12.99, Category: "Beverages", Stock: 150},
	{ID: "2", Name: "Espresso Cup", Price: 8.49, Category: "Accessories", Stock: 45},
	{ID: "3", Name: "Tea Leaves", Price: 6.99, Category: "Beverages", Stock: 200},
	{ID: "4", Name: "Milk Frother", Price: 34.99, Category: "Equipment", Stock: 12},
	{ID: "5", Name: "Sugar Cubes", Price: 3.99, Category: "Supplies", Stock: 500},
}

var orders []Order
var customers []Customer

// Product Handlers
func getProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func getProductByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	productID := vars["id"]

	for _, product := range products {
		if product.ID == productID {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(product)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Product not found"})
}

func createProduct(w http.ResponseWriter, r *http.Request) {
	var product Product
	err := json.NewDecoder(r.Body).Decode(&product)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	product.ID = strconv.Itoa(len(products) + 1)
	products = append(products, product)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(product)
}

func updateProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	productID := vars["id"]

	var updatedProduct Product
	err := json.NewDecoder(r.Body).Decode(&updatedProduct)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	for i, product := range products {
		if product.ID == productID {
			updatedProduct.ID = productID
			products[i] = updatedProduct
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(updatedProduct)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Product not found"})
}

func deleteProductHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	productID := vars["id"]

	for i, product := range products {
		if product.ID == productID {
			products = append(products[:i], products[i+1:]...)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]string{"message": "Product deleted successfully"})
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Product not found"})
}

// Order Handlers
func getOrders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if len(orders) == 0 {
		json.NewEncoder(w).Encode([]Order{})
		return
	}
	json.NewEncoder(w).Encode(orders)
}

func createOrder(w http.ResponseWriter, r *http.Request) {
	var order Order
	err := json.NewDecoder(r.Body).Decode(&order)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	order.ID = "ORD-" + strconv.Itoa(len(orders)+1000)
	order.CreatedAt = time.Now()
	order.Status = "Completed"
	orders = append(orders, order)

	// Update product stock
	for _, item := range order.Items {
		for i, product := range products {
			if product.ID == item.ProductID {
				products[i].Stock -= item.Quantity
			}
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(order)
}

func getOrderByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	orderID := vars["id"]

	for _, order := range orders {
		if order.ID == orderID {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(order)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Order not found"})
}

// Customer Handlers
func getCustomers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if len(customers) == 0 {
		json.NewEncoder(w).Encode([]Customer{})
		return
	}
	json.NewEncoder(w).Encode(customers)
}

func createCustomer(w http.ResponseWriter, r *http.Request) {
	var customer Customer
	err := json.NewDecoder(r.Body).Decode(&customer)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	customer.ID = strconv.Itoa(len(customers) + 1)
	customer.CreatedAt = time.Now()
	customers = append(customers, customer)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(customer)
}

func getCustomerByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	customerID := vars["id"]

	for _, customer := range customers {
		if customer.ID == customerID {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(customer)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Customer not found"})
}

func updateCustomer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	customerID := vars["id"]

	var updatedCustomer Customer
	err := json.NewDecoder(r.Body).Decode(&updatedCustomer)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Invalid request body"})
		return
	}

	for i, customer := range customers {
		if customer.ID == customerID {
			updatedCustomer.ID = customerID
			customers[i] = updatedCustomer
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(updatedCustomer)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Customer not found"})
}

func deleteCustomerHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	customerID := vars["id"]

	for i, customer := range customers {
		if customer.ID == customerID {
			customers = append(customers[:i], customers[i+1:]...)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]string{"message": "Customer deleted successfully"})
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	json.NewEncoder(w).Encode(map[string]string{"error": "Customer not found"})
}

// Health Check
func healthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func main() {
	router := mux.NewRouter()

	// Health Check
	router.HandleFunc("/api/health", healthCheck).Methods("GET")

	// Product Routes
	router.HandleFunc("/api/products", getProducts).Methods("GET")
	router.HandleFunc("/api/products/{id}", getProductByID).Methods("GET")
	router.HandleFunc("/api/products", createProduct).Methods("POST")
	router.HandleFunc("/api/products/{id}", updateProduct).Methods("PUT")
	router.HandleFunc("/api/products/{id}", deleteProductHandler).Methods("DELETE")

	// Order Routes
	router.HandleFunc("/api/orders", getOrders).Methods("GET")
	router.HandleFunc("/api/orders/{id}", getOrderByID).Methods("GET")
	router.HandleFunc("/api/orders", createOrder).Methods("POST")

	// Customer Routes
	router.HandleFunc("/api/customers", getCustomers).Methods("GET")
	router.HandleFunc("/api/customers", createCustomer).Methods("POST")
	router.HandleFunc("/api/customers/{id}", getCustomerByID).Methods("GET")
	router.HandleFunc("/api/customers/{id}", updateCustomer).Methods("PUT")
	router.HandleFunc("/api/customers/{id}", deleteCustomerHandler).Methods("DELETE")

	// CORS middleware
	handler := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000", "*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)(router)

	log.Println("Starting POS API server on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
