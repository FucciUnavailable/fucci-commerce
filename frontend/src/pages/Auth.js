import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { login, register } = useAuth(); // Access both login and register functions
  const navigate = useNavigate();

  // State to manage the current form (login or register)
  const [isLogin, setIsLogin] = useState(true);

  // States for form fields
  const [name, setName] = useState(''); // Only used for register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for error messages
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      if (isLogin) {
        await login(email, password); // Attempt login
      } else {
        await register(name, email, password); // Attempt registration
      }
      navigate('/shop'); // Redirect after successful login/registration
    } catch (err) {
      // Set an error message if login/registration fails
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className={isLogin ? "login-form" : "register-form"}>
        {/* Only show name input when registering */}
        {!isLogin && (
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Name" 
          />
        )}
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      
      {/* Display error message */}
      {error && <p className="error-message">{error}</p>}
      
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
          {isLogin ? 'Register' : 'Login'}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
