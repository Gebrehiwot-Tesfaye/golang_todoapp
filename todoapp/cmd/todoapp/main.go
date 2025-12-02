package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	_ "todoapp/cmd/todoapp/docs"
	"todoapp/internal/todo"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
	httpSwagger "github.com/swaggo/http-swagger"
)

func main() {
	dbURL := "postgres://postgres:Gebby@0953@localhost:5432/postgres?sslmode=disable"

	dbpool, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		log.Fatal("Database connection failed:", err)
	}
	defer dbpool.Close()

	repo := todo.NewPostgresRepository(dbpool)

	// Check database connection
	if err := repo.Ping(); err != nil {
		log.Fatalf("Cannot connect to database: %v", err)
	}

	// Create todos table if it doesn't exist
	if err := repo.CreateTableIfNotExists(); err != nil {
		log.Fatalf("Failed to create todos table: %v", err)
	}

	service := todo.NewService(repo)
	h := todo.NewHandler(service)

	r := mux.NewRouter()
	h.RegisterRoutes(r)

	r.PathPrefix("/swagger/").Handler(httpSwagger.Handler(
		httpSwagger.URL("/swagger/doc.json"),
	))

	http.Handle("/", r)

	srv := &http.Server{
		Addr:         ":8081",
		Handler:      nil,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	fmt.Println("Server running at http://localhost:8081")
	log.Fatal(srv.ListenAndServe())
}
