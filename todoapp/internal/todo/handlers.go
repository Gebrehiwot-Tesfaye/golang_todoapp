package todo

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"
)

// Handler handles HTTP requests.
type Handler struct {
	service Service
}

// NewHandler creates a new Handler.
func NewHandler(service Service) *Handler {
	return &Handler{service: service}
}

// RegisterRoutes registers the routes for todo endpoints.
func (h *Handler) RegisterRoutes(r *mux.Router) {
	r.HandleFunc("/todos", h.todosHandler).Methods("GET", "POST")
	r.HandleFunc("/todos/{id}", h.todoItemHandler).Methods("GET", "PUT", "DELETE")
	r.HandleFunc("/todos/{id}/toggle", h.toggleHandler).Methods("POST")
}

// CreateTodoRequest represents the request body for creating a todo.
type CreateTodoRequest struct {
	Title string `json:"title" example:"Buy groceries"`
}

// UpdateTodoRequest represents the request body for updating a todo.
type UpdateTodoRequest struct {
	Title     *string `json:"title,omitempty" example:"Updated title"`
	Completed *bool   `json:"completed,omitempty" example:"true"`
}

// todosHandler handles GET /todos and POST /todos.
// @Summary List all todos or create a new todo
// @Tags todos
// @Produce json
// @Success 200 {array} Todo "List of todos"
// @Failure 500 {object} map[string]string "Internal server error"
// @Router /todos [get]
// @Param todo body CreateTodoRequest false "Todo to create"
// @Success 201 {object} Todo "Newly created todo"
// @Failure 400 {object} map[string]string "Invalid request"
// @Router /todos [post]
func (h *Handler) todosHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		todos, err := h.service.List()
		if err != nil {
			log.Printf("Failed to list todos: %v", err)
			writeJSON(w, http.StatusInternalServerError, map[string]interface{}{
				"error": "failed to list todos",
				"details": err.Error(),
			})
			return
		}
		// Return empty array instead of null when no todos exist
		if todos == nil {
			todos = []Todo{}
		}
		writeJSON(w, http.StatusOK, todos)

	case http.MethodPost:
		var req CreateTodoRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid json"})
			return
		}
		if strings.TrimSpace(req.Title) == "" {
			writeJSON(w, http.StatusBadRequest, map[string]string{"error": "title is required"})
			return
		}
		todo, err := h.service.Create(req.Title)
		if err != nil {
			log.Printf("Failed to create todo: %v", err)
			writeJSON(w, http.StatusInternalServerError, map[string]interface{}{
				"error": "failed to create todo",
				"details": err.Error(),
			})
			return
		}
		log.Printf("Successfully created todo with ID: %d", todo.ID)
		writeJSON(w, http.StatusCreated, todo)

	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}


// todoItemHandler handles GET /todos/{id}, PUT /todos/{id}, and DELETE /todos/{id}.
// @Summary Get, update, or delete a todo
// @Tags todos
// @Produce json
// @Param id path int true "Todo ID"
// @Success 200 {object} Todo "Todo details"
// @Failure 400 {object} map[string]string "Invalid ID format"
// @Failure 404 {object} map[string]string "Todo not found"
// @Router /todos/{id} [get]
// @Param todo body UpdateTodoRequest false "Todo data to update"
// @Success 200 {object} Todo "Updated todo"
// @Router /todos/{id} [put]
// @Success 200 {object} map[string]string "Success message"
// @Router /todos/{id} [delete]
func (h *Handler) todoItemHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid id"})
		return
	}

	switch r.Method {
	case http.MethodGet:
		t, err := h.service.Get(id)
		if err != nil {
			writeJSON(w, http.StatusNotFound, map[string]string{
				"error":   "todo not found",
				"details": err.Error(),
			})
			return
		}
		writeJSON(w, http.StatusOK, t)

	case http.MethodPut:
		var req UpdateTodoRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid json"})
			return
		}

		t, err := h.service.Get(id)
		if err != nil {
			writeJSON(w, http.StatusNotFound, map[string]string{"error": "todo not found"})
			return
		}

		if req.Title != nil {
			t.Title = *req.Title
		}

		if req.Completed != nil {
			t.Completed = *req.Completed
			if t.Completed && t.CompletedAt == nil {
				timeNow := time.Now()
				t.CompletedAt = &timeNow
			} else if !t.Completed {
				t.CompletedAt = nil
			}
		}

		updated, err := h.service.Update(id, t.Title, t.Completed)
		if err != nil {
			writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "failed to update todo"})
			return
		}

		writeJSON(w, http.StatusOK, updated)

	case http.MethodDelete:
		if err := h.service.Delete(id); err != nil {
			writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "failed to delete todo"})
			return
		}
		writeJSON(w, http.StatusOK, map[string]string{"message": "todo deleted successfully"})

	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
	}
}


// toggleHandler handles POST /todos/{id}/toggle.
// @Summary Toggle todo completion status
// @Tags todos
// @Produce json
// @Param id path int true "Todo ID"
// @Success 200 {object} Todo "Updated todo"
// @Failure 400 {object} map[string]string "Invalid ID format"
// @Failure 404 {object} map[string]string "Todo not found"
// @Router /todos/{id}/toggle [post]
func (h *Handler) toggleHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid ID format"})
		return
	}

	todo, err := h.service.Toggle(id)
if err != nil {
    if err.Error() == "todo not found" {
        writeJSON(w, http.StatusNotFound, map[string]string{"error": "todo not found"})
        return
    }
    writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "internal server error"})
    return
}
writeJSON(w, http.StatusOK, todo)
}


// writeJSON is a helper function to write JSON responses.
func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(v); err != nil {
		fmt.Println("failed to write json:", err)
	}
}