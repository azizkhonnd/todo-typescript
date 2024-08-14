import React, { useState, useEffect, useRef } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo } from './models/Todo';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const hasLoadedTodos = useRef(false);

  // Load todos from localStorage on initial render
  useEffect(() => {
    if (!hasLoadedTodos.current) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
      hasLoadedTodos.current = true;
    }
  }, []);

  useEffect(() => {
    if (hasLoadedTodos.current) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      isEditing: false, 
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, isEditing: !todo.isEditing, text: todo.isEditing ? newText : todo.text }
          : todo
      )
    );
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
    </div>
  );
};

export default App;
