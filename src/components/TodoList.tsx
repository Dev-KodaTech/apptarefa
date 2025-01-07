import { useState } from 'react'
import { useTodos } from '@/hooks/useTodos'
import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const { todos, addTodo, toggleTodo, removeTodo, updateTodoText, setTodoDueDate } = useTodos()
  const [newTodoText, setNewTodoText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim())
      setNewTodoText('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 p-2 border rounded"
          data-testid="new-todo-input"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          data-testid="add-todo-button"
        >
          Add Todo
        </button>
      </form>

      <div className="space-y-2">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            onUpdateText={updateTodoText}
            onSetDueDate={setTodoDueDate}
          />
        ))}
      </div>
    </div>
  )
}