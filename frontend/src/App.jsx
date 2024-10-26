import { useState } from 'react';
import Auth from './components/Auth';
import TodoList from './components/TodoList';

export default function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem('access_token'));

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setAuth(false);
  };

  return (
    <div className="App">
      {auth ? (
        <>
          <button onClick={handleLogout} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
          <TodoList />
        </>
      ) : (
        <Auth setAuth={setAuth} />
      )}
    </div>
  );
}
