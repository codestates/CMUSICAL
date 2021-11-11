import React, { useState } from 'react';

const SignIn = () => {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const handleSignIn = () => {
    console.log('Sign In');
  };

  return (
    <div>
      <center>
        <h1>CMUSICAL</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <span>ID</span>
            <input type="text" value={inputId} onChange={handleInputId} />
          </div>
          <div>
            <span>Password</span>
            <input type="password" value={inputPw} onChange={handleInputPw} />
          </div>
          <button type="submit" onClick={handleSignIn}>
            Sign In
          </button>
          <div>Sign Up</div>
        </form>
      </center>
    </div>
  );
};

export default SignIn;
