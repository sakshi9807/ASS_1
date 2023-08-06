import React from 'react';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  const handleSignupSubmit = (username, password) => {
    // Implement the signup request to the backend here
  };

  return (
    <div>
      <h1>Signup</h1>
      <SignupForm onSubmit={handleSignupSubmit} />
    </div>
  );
};

export default Signup;
