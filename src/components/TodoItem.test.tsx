import { render, screen, fireEvent } from '@testing-library/react'
import { TodoItem } from './TodoItem'
import { Todo } from '@/types/todo'

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    text: 'Test todo',
    completed: false
  }

  const mockHandlers = {
    onToggle: jest.fn(),
    onRemove: jest.fn(),
    onUpdateText: jest.fn(),
    onSetDueDate: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />)
    
    expect(screen.getByText('Test todo')).toBeInTheDocument()
    expect(screen.getByTestId('todo-checkbox-1')).not.toBeChecked()
  })

  it('calls onToggle when checkbox is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />)
    
    fireEvent.click(screen.getByTestId('todo-checkbox-1'))
    expect(mockHandlers.onToggle).toHaveBeenCalledWith('1')
  })

  it('calls onRemove when delete button is clicked', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />)
    
    fireEvent.click(screen.getByTestId('todo-delete-1'))
    expect(mockHandlers.onRemove).toHaveBeenCalledWith('1')
  })

  it('enters edit mode and updates text', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />)
    
    fireEvent.click(screen.getByTestId('todo-text-1'))
    const input = screen.getByTestId('todo-edit-input-1')
    fireEvent.change(input, { target: { value: 'Updated todo' } })
    fireEvent.submit(input.closest('form')!)
    
    expect(mockHandlers.onUpdateText).toHaveBeenCalledWith('1', 'Updated todo')
  })

  it('sets due date', () => {
    render(<TodoItem todo={mockTodo} {...mockHandlers} />)
    
    const dateInput = screen.getByTestId('todo-date-1')
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } })
    
    expect(mockHandlers.onSetDueDate).toHaveBeenCalledWith('1', '2024-01-01')
  })

  it('shows completed todo with line-through style', () => {
    const completedTodo = { ...mockTodo, completed: true }
    render(<TodoItem todo={completedTodo} {...mockHandlers} />)
    
    const todoText = screen.getByTestId('todo-text-1')
    expect(todoText).toHaveClass('line-through')
  })
})