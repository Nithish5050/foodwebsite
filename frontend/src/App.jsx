import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // login, dashboard
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    // Simple hardcoded authentication
    if (username === 'Ragavi' && password === 'ragavipon') {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  return (
    <div className="app">
      {currentPage === 'login' && (
        <LoginPage 
          onLogin={handleLogin}
        />
      )}
      {currentPage === 'dashboard' && isAuthenticated && (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;

