import { useState } from 'react';
import { updateTodo, deleteTodo } from '../api';

export default function TodoItem({ todo }) {
  const [title, setTitle] = useState(todo.title);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    try {
      await updateTodo(todo.id, { title });
      setEditing(false);
      setError(null);
    } catch (error) {
      setError("Failed to update todo");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      window.location.reload();
    } catch (error) {
      setError("Failed to delete todo");
    }
  };

  return (
    <div className="flex items-center space-x-4 border-b p-2">
      {editing ? (
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 flex-grow" />
      ) : (
        <span className="flex-grow">{todo.title}</span>
      )}
      {editing ? (
        <button onClick={handleUpdate} className="text-blue-500">Save</button>
      ) : (
        <button onClick={() => setEditing(true)} className="text-blue-500">Edit</button>
      )}
      <button onClick={handleDelete} className="text-red-500">Delete</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
