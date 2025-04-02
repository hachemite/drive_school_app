// File: drive_school_app/src/pages/LogIn.tsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authenticateUser } from '../api/authApi';
import { setAuthToken } from '../utils/auth';
import { Loader2 } from 'lucide-react';

const LogIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await authenticateUser(username, password);
      
      if (response.success) {
        setAuthToken(response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        history.push('/');
        window.location.reload();
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4 bg-gradient-to-br from-[#ADB2D4] to-[#D5E5D5]">
    <div className="w-full max-w-md">
      <div className="bg-[#EEF1DA] rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#5a5f7c]">Drive School</h2>
              <p className="text-[#ADB2D4] mt-2">Sign in to your account</p>
            </div>
            
            {error && (
              <div className="mb-6 p-3 bg-[#ffebee] text-[#d32f2f] rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="username" className="block text-sm font-medium text-[#5a5f7c] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#C7D9DD] focus:outline-none focus:ring-2 focus:ring-[#ADB2D4] focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="mb-8">
                <label htmlFor="password" className="block text-sm font-medium text-[#5a5f7c] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#C7D9DD] focus:outline-none focus:ring-2 focus:ring-[#ADB2D4] focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#ADB2D4] hover:bg-[#8d92b5] text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Logging in...
                  </>
                ) : 'Login'}
              </button>
            </form>
          </div>
          
          <div className="px-8 py-4 bg-[#D5E5D5] text-center">
            <p className="text-sm text-[#5a5f7c]">
              Don't have an account?{' '}
              <a href="/register" className="font-medium text-[#ADB2D4] hover:text-[#8d92b5]">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;