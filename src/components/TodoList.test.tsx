import { render, screen, fireEvent, act } from '@testing-library/react'
import { TodoList } from './TodoList'

describe('TodoList', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds a new todo', () => {
    render(<TodoList />)
    
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    
    fireEvent.change(input, { target: { value: 'New todo' } })
    fireEvent.click(addButton)
    
    expect(screen.getByText('New todo')).toBeInTheDocument()
  })

  it('toggles todo completion', () => {
    render(<TodoList />)
    
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    
    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(addButton)
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    const todoText = screen.getByText('Test todo')
    expect(todoText).toHaveClass('line-through')
  })

  it('removes a todo', () => {
    render(<TodoList />)
    
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    
    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(addButton)
    
    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    fireEvent.click(deleteButton)
    
    expect(screen.queryByText('Test todo')).not.toBeInTheDocument()
  })

  it('updates todo text', () => {
    render(<TodoList />)
    
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    
    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(addButton)
    
    const todoText = screen.getByText('Test todo')
    fireEvent.click(todoText)
    
    const editInput = screen.getByDisplayValue('Test todo')
    fireEvent.change(editInput, { target: { value: 'Updated todo' } })
    fireEvent.submit(editInput.closest('form')!)
    
    expect(screen.getByText('Updated todo')).toBeInTheDocument()
  })

  it('sets todo due date', () => {
    render(<TodoList />)
    
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    
    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(addButton)
    
    const dateInput = screen.getByRole('textbox', { type: 'date' })
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } })
    
    expect(dateInput).toHaveValue('2024-01-01')
  })

  it('persists todos in localStorage', () => {
    const { unmount } = render(<TodoList />)
    
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    
    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(addButton)
    
    unmount()
    
    render(<TodoList />)
    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })
})