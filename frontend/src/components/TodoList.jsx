import { useState, useEffect } from 'react';
import { fetchTodos, addTodo } from '../api';
import TodoItem from './TodoItem';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data } = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };
    getTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!title) return setError("Title cannot be empty");
    try {
      const { data } = await addTodo({ title });
      setTodos([...todos, data]);
      setTitle('');
      setError(null);
    } catch (error) {
      setError("Failed to add todo");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">ToDo List</h1>
      <div className="flex mt-4 space-x-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
          className="border border-gray-300 p-3 flex-grow rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button 
          onClick={handleAddTodo} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
