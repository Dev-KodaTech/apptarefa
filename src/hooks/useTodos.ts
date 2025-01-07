import { useState, useEffect } from 'react'
import { Todo } from '@/types/todo'

const STORAGE_KEY = 'todos'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const storedTodos = localStorage.getItem(STORAGE_KEY)
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    setTodos(prev => [...prev, {
      id: Math.random().toString(36).substring(2, 9),
      text,
      completed: false
    }])
  }

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const updateTodoText = (id: string, text: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    ))
  }

  const setTodoDueDate = (id: string, dueDate: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, dueDate } : todo
    ))
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
    updateTodoText,
    setTodoDueDate
  }
}