import React, { useState, useEffect } from 'react';

const SignIn = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleUserId = (e) => {
    setUserId(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    console.log('Sign In');
  };

  useEffect(() => {});

  return (
    <div>
      <center>
        <h1>CMUSICAL</h1>
        <div>
          <span>ID</span>
          <input type="text" value={userId} onChange={handleUserId} />
        </div>
        <div>
          <span>Password</span>
          <input type="password" value={password} onChange={handlePassword} />
        </div>
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
        <div>Link to Sign Up</div>
      </center>
    </div>
  );
};

export default SignIn;
