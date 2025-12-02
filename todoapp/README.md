# TodoApp

Simple in-memory TODO REST API in Go.

Endpoints:
- POST   /todos           Create new todo (JSON: { "title": "..." })
- GET    /todos           List todos
- GET    /todos/{id}      Get todo by ID
- PUT    /todos/{id}      Update todo title (JSON: { "title": "..." })
- DELETE /todos/{id}      Delete todo
- POST   /todos/{id}/toggle  Toggle completed status

Run:
```
cd cmd/todoapp
go run .
```
Server listens on :8080
