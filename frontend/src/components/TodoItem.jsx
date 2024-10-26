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
      window.location.reload(); // Consider using state management instead of reload
    } catch (error) {
      setError("Failed to delete todo");
    }
  };

  return (
    <div className="flex items-center space-x-4 border-b p-4">
      {editing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 flex-grow rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <span className="flex-grow text-gray-800">{todo.title}</span>
      )}
      {editing ? (
        <button 
          onClick={handleUpdate} 
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
        >
          Save
        </button>
      ) : (
        <button 
          onClick={() => setEditing(true)} 
          className="text-blue-500 hover:underline transition duration-200"
        >
          Edit
        </button>
      )}
      <button 
        onClick={handleDelete} 
        className="text-red-500 hover:underline transition duration-200"
      >
        Delete
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
