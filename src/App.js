import { useState, useEffect } from 'react';
import { PaperSize } from './components/PaperSize';
import { Shape } from './components/Shape';
import { Gap } from './components/Gap';
import { Canvas } from './components/Canvas';
import { Login } from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthCookie = () => {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find((cookie) => cookie.trim().startsWith('printCalculatorAuth='));
    return authCookie && authCookie.includes('true');
  };

  const clearAuthCookie = () => {
    document.cookie = 'printCalculatorAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    clearAuthCookie();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (checkAuthCookie()) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="container mx-4 lg:mx-auto my-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Print size calculator</h1>
        <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Logout
        </button>
      </div>

      <div className="lg:flex gap-8">
        <div className="form max-w-md w-full">
          <PaperSize />
          {/* <Margin /> */}
          <Shape />
          <Gap />
        </div>

        <div className=" px-4 md:px-8 py-4 rounded-md border-gray-200 w-full border">
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default App;
