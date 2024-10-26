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
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold">ToDo List</h1>
      <div className="flex mt-4 space-x-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
          className="border p-2 flex-grow"
        />
        <button onClick={handleAddTodo} className="bg-green-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
