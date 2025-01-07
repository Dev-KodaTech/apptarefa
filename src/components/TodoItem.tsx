import { useState } from 'react'
import { Todo } from '@/types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onUpdateText: (id: string, text: string) => void
  onSetDueDate: (id: string, dueDate: string) => void
}

export const TodoItem = ({
  todo,
  onToggle,
  onRemove,
  onUpdateText,
  onSetDueDate
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editText.trim()) {
      onUpdateText(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  return (
    <div className="flex items-center gap-4 p-2 border rounded">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5"
        data-testid={`todo-checkbox-${todo.id}`}
      />
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-1 border rounded"
            data-testid={`todo-edit-input-${todo.id}`}
            autoFocus
          />
        </form>
      ) : (
        <span
          className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
          onClick={() => setIsEditing(true)}
          data-testid={`todo-text-${todo.id}`}
        >
          {todo.text}
        </span>
      )}

      <input
        type="date"
        value={todo.dueDate || ''}
        onChange={(e) => onSetDueDate(todo.id, e.target.value)}
        className="p-1 border rounded"
        data-testid={`todo-date-${todo.id}`}
      />

      <button
        onClick={() => onRemove(todo.id)}
        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
        data-testid={`todo-delete-${todo.id}`}
      >
        Delete
      </button>
    </div>
  )
}