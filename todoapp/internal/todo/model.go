package todo

import "time"

// Todo represents a todo item.
type Todo struct {
	ID          int        `json:"id" example:"1"`
	Title       string     `json:"title" example:"Buy groceries"`
	Completed   bool       `json:"completed" example:"false"`
	CreatedAt   time.Time  `json:"created_at" example:"2023-01-01T00:00:00Z"`
	CompletedAt *time.Time `json:"completed_at,omitempty" example:"2023-01-02T15:04:05Z"`
}