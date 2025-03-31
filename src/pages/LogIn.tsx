// File: drive_school_app/src/pages/LogIn.tsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authenticateUser } from '../api/authApi';
import { setAuthToken } from '../utils/auth';

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
              // Store the token and user data
              setAuthToken(response.token);
              localStorage.setItem('user', JSON.stringify(response.user));
        
              // Redirect to home page
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
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LogIn;