package todo

import "time"
type Repository interface {
	List() ([]Todo, error)
	Create(title string) (Todo, error)
	Get(id int) (Todo, error)
	Update(id int, title string, completed bool, completedAt *time.Time) (Todo, error)
	Delete(id int) error
	Toggle(id int) (Todo, error)
	Ping() error
	CreateTableIfNotExists() error
}
