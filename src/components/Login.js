import { useState } from 'react';

export function Login({ onLogin }) {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [showAccessCode, setShowAccessCode] = useState(false);

  const setAuthCookie = () => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3); // 3 days from now
    document.cookie = `printCalculatorAuth=true; expires=${expirationDate.toUTCString()}; path=/`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accessCode === 'blackWood') {
      setAuthCookie();
      onLogin();
      setError('');
    } else {
      setError('Incorrect access code. Please try again.');
      setAccessCode('');
    }
  };

  const toggleAccessCodeVisibility = () => {
    setShowAccessCode(!showAccessCode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full py-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Print Calculator</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Enter access code to continue</p>
        </div>
        <form className="mt-8 space-y-6 max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="accessCode" className="sr-only">
              Access Code
            </label>
            <input id="accessCode" name="accessCode" type={showAccessCode ? 'text' : 'password'} required className="appearance-none rounded-md relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Access Code" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 " onClick={toggleAccessCodeVisibility}>
              {showAccessCode ? (
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.45 16.31c-1.47-1.04-2.8-2.42-3.92-3.89 -.2-.27-.2-.61-.01-.87C6 8.31 9 5.97 11.98 5.97c1.48 0 3.01.59 4.55 1.68 .45.31 1.07.21 1.39-.24 .31-.46.21-1.08-.24-1.4 -1.85-1.32-3.77-2.06-5.71-2.06 -3.8 0-7.22 2.65-10.06 6.35 -.75.97-.75 2.31 0 3.29 1.23 1.61 2.69 3.12 4.34 4.29 .45.31 1.07.21 1.39-.24 .31-.46.21-1.08-.24-1.4Z" />
                  <path d="M14.83 9.18c-.75-.76-1.76-1.19-2.84-1.19 -2.21 0-4 1.79-4 4 0 1.07.43 2.09 1.18 2.83 .39.38 1.02.38 1.41-.01 .38-.4.38-1.03-.01-1.42 -.38-.38-.6-.88-.6-1.42 0-1.11.89-2 2-2 .54 0 1.04.21 1.41.59 .38.39 1.02.39 1.41 0 .39-.39.39-1.03 0-1.42Z" />
                  <path d="M4.7 20.7l15.99-16c.39-.4.39-1.03-.01-1.42 -.4-.4-1.03-.4-1.42 0l-16 16c-.4.39-.4 1.02 0 1.41 .39.39 1.02.39 1.41-.01Z" />
                  <path d="M9.71 19.66c.75.22 1.51.33 2.28.33 3.79 0 7.21-2.66 10.05-6.36 .74-.98.74-2.32-.01-3.3 -.53-.69-1.12-1.38-1.76-2.05 -.39-.4-1.02-.41-1.42-.03 -.4.38-.41 1.01-.03 1.41 .59.61 1.13 1.24 1.61 1.87 .19.26.2.6 0 .86 -2.49 3.23-5.49 5.57-8.47 5.57 -.57 0-1.14-.09-1.72-.26 -.54-.16-1.09.14-1.25.67 -.16.53.14 1.08.67 1.24Z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.46 11.57c.19.26.19.59-.001.85 -2.49 3.23-5.49 5.57-8.47 5.57 -2.99 0-5.99-2.34-8.47-5.58 -.2-.27-.2-.6 0-.86 2.48-3.24 5.48-5.58 8.46-5.58 2.98 0 5.98 2.33 8.46 5.57Zm1.58-1.22c-2.84-3.7-6.26-6.36-10.06-6.36 -3.8 0-7.22 2.65-10.06 6.35 -.75.97-.75 2.31-.01 3.29 2.83 3.69 6.25 6.35 10.05 6.35 3.79 0 7.21-2.66 10.05-6.36 .74-.98.74-2.32 0-3.3Z" />
                  <path d="M14 12c0 1.1-.9 2-2 2 -1.11 0-2-.9-2-2 0-1.11.89-2 2-2 1.1 0 2 .89 2 2Zm2 0c0-2.21-1.8-4-4-4 -2.21 0-4 1.79-4 4 0 2.2 1.79 4 4 4 2.2 0 4-1.8 4-4Z" />
                </svg>
              )}
            </button>
          </div>

          {error && <div className="text-red-600 text-sm text-center">{error}</div>}

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Access Calculator
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
