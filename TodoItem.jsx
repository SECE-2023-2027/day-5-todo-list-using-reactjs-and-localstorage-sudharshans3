import React from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <div className="todo-item">
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <div className="actions">
        <button onClick={onEdit} className="edit">✏️</button>
        <button onClick={onDelete} className="delete">🗑️</button>
      </div>
    </div>
  );
}

export default TodoItem;
