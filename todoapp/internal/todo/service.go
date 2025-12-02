package todo

import "time"

type service struct {
	repo Repository
}

type Service interface {
	List() ([]Todo, error)
	Create(title string) (Todo, error)
	Get(id int) (Todo, error)
	Update(id int, title string, completed bool) (Todo, error)
	Delete(id int) error
	Toggle(id int) (Todo, error)
}

func NewService(repo Repository) Service {
	return &service{repo: repo}
}

func (s *service) List() ([]Todo, error) {
	todos, err := s.repo.List()
	if err != nil {
		return nil, err
	}
	return todos, nil
}

func (s *service) Create(title string) (Todo, error) {
	t, err := s.repo.Create(title)
	if err != nil {
		return Todo{}, err
	}
	return t, nil
}

func (s *service) Get(id int) (Todo, error) {
	t, err := s.repo.Get(id)
	if err != nil {
		return Todo{}, err
	}
	return t, nil
}

func (s *service) Update(id int, title string, completed bool) (Todo, error) {
	var completedAt *time.Time
	if completed {
		t := time.Now()
		completedAt = &t
	}
	t, err := s.repo.Update(id, title, completed, completedAt)
	if err != nil {
		return Todo{}, err
	}
	return t, nil
}

func (s *service) Delete(id int) error {
	return s.repo.Delete(id)
}

func (s *service) Toggle(id int) (Todo, error) {
	t, err := s.repo.Toggle(id)
	return t, err
}
