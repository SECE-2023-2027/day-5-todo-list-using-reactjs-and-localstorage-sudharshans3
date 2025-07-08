import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;
    const updated = editingIndex !== null
      ? todos.map((todo, i) => i === editingIndex ? { ...todo, text } : todo)
      : [...todos, { text, completed: false }];
    setTodos(updated);
    setText('');
    setEditingIndex(null);
  };

  const toggleTodo = (index) => {
    const updated = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index) => {
    setText(todos[index].text);
    setEditingIndex(index);
  };

  return (
    <div className="container">
      <h2>Add a Todo</h2>
      <div className="input-group">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Todo"
        />
        <button onClick={addTodo}>Save</button>
      </div>
      <h3>Your Todo's</h3>
      {todos.map((todo, i) => (
        <TodoItem
          key={i}
          todo={todo}
          onToggle={() => toggleTodo(i)}
          onDelete={() => deleteTodo(i)}
          onEdit={() => editTodo(i)}
        />
      ))}
    </div>
  );
}

export default App;
