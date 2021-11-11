import React, { useState } from 'react';

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
        <button type="submit" onClick={handleSignIn}>
          Sign In
        </button>
        <div>Sign Up</div>
      </center>
    </div>
  );
};

export default SignIn;
