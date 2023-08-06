import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const handleLoginSubmit = (username, password) => {
    // Implement the login request to the backend here
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default Login;
