// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password }); // Debug log
    try {
      const response = await axios.post('/auth/login', { email, password });
      console.log('Login response:', response); // Debug log
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // Redirect to Dashboard on successful login
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', error.response?.data || error); // Log detailed error
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <div className="login-error">{error}</div>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
        <a href="/signup">Don't have an account? Register here</a>
      </form>
    </div>
  );
}

export default Login;

