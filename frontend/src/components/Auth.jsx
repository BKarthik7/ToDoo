import { useState } from 'react';
import { login, register } from '../api';

export default function Auth({ setAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = isLogin ? await login(form) : await register(form);
      localStorage.setItem('access_token', response.data.access_token);
      setAuth(true);
    } catch (error) {
      setError('Invalid credentials or user already exists');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
              Email
            </label>
            <input 
              type="text" 
              name="username" 
              id="username"
              onChange={handleChange} 
              placeholder="Email" 
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input 
              type="password" 
              name="password" 
              id="password"
              onChange={handleChange} 
              placeholder="Password" 
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="text-sm text-blue-700 mt-4 hover:underline"
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}
