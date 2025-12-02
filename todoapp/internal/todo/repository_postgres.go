package todo

import (
	"context"
	"log"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type PostgresRepository struct {
	DB *pgxpool.Pool
}

func NewPostgresRepository(db *pgxpool.Pool) *PostgresRepository {
	return &PostgresRepository{DB: db}
}

func (r *PostgresRepository) List() ([]Todo, error) {
	rows, err := r.DB.Query(context.Background(),
		`SELECT id, title, completed, created_at, completed_at FROM todos ORDER BY id`,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var todos []Todo

	for rows.Next() {
		var t Todo
		err := rows.Scan(&t.ID, &t.Title, &t.Completed, &t.CreatedAt, &t.CompletedAt)
		if err != nil {
			return nil, err
		}
		todos = append(todos, t)
	}

	return todos, nil
}

func (r *PostgresRepository) Create(title string) (Todo, error) {
	var t Todo
	err := r.DB.QueryRow(context.Background(),
		`INSERT INTO todos (title, completed, created_at)
		 VALUES ($1, false, NOW())
		 RETURNING id, title, completed, created_at, completed_at`,
		title,
	).Scan(&t.ID, &t.Title, &t.Completed, &t.CreatedAt, &t.CompletedAt)

	return t, err
}

func (r *PostgresRepository) Get(id int) (Todo, error) {
	var t Todo
	err := r.DB.QueryRow(context.Background(),
		`SELECT id, title, completed, created_at, completed_at FROM todos WHERE id=$1`,
		id,
	).Scan(&t.ID, &t.Title, &t.Completed, &t.CreatedAt, &t.CompletedAt)

	return t, err
}

func (r *PostgresRepository) Update(id int, title string, completed bool, completedAt *time.Time) (Todo, error) {
	var t Todo

	err := r.DB.QueryRow(context.Background(),
		`UPDATE todos 
		  SET title=$1, completed=$2, completed_at=$3 
		  WHERE id=$4
		  RETURNING id, title, completed, created_at, completed_at`,
		title, completed, completedAt, id,
	).Scan(&t.ID, &t.Title, &t.Completed, &t.CreatedAt, &t.CompletedAt)

	return t, err
}

func (r *PostgresRepository) Delete(id int) error {
	_, err := r.DB.Exec(context.Background(), `DELETE FROM todos WHERE id=$1`, id)
	return err
}

func (r *PostgresRepository) Toggle(id int) (Todo, error) {
	var t Todo
	err := r.DB.QueryRow(context.Background(),
		`UPDATE todos
		 SET completed = NOT completed,
		     completed_at = CASE 
		         WHEN completed = false THEN NOW()
		         ELSE NULL 
		     END
		 WHERE id=$1
		 RETURNING id, title, completed, created_at, completed_at`,
		id,
	).Scan(&t.ID, &t.Title, &t.Completed, &t.CreatedAt, &t.CompletedAt)

	return t, err
}

// Ping checks if the database is accessible
func (r *PostgresRepository) Ping() error {
	return r.DB.Ping(context.Background())
}

// CreateTableIfNotExists creates the todos table if it doesn't exist
func (r *PostgresRepository) CreateTableIfNotExists() error {
	_, err := r.DB.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS todos (
			id SERIAL PRIMARY KEY,
			title TEXT NOT NULL,
			completed BOOLEAN NOT NULL DEFAULT false,
			created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
			completed_at TIMESTAMP WITH TIME ZONE
		)
	`)
	if err != nil {
		log.Printf("Error creating todos table: %v", err)
	}
	return err
}
