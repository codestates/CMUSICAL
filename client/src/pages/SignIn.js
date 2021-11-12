import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignButton } from '../components/styles/SignButton.styled';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    // TODO : 서버에 로그인을 요청하고, props로 전달된 callback을 호출하기
    console.log('Sign In');
  };

  const handleSignUp = () => {
    // TODO : 서버에 로그인을 요청하고, props로 전달된 callback을 호출하기
    console.log('Sign Up');
  };

  useEffect(() => {});

  return (
    <div>
      <center>
        <h1>CMUSICAL</h1>
        <div>
          <span>ID</span>
          <input type="text" value={username} onChange={handleUsername} />
        </div>
        <div>
          <span>Password</span>
          <input type="password" value={password} onChange={handlePassword} />
        </div>
        <Link to="/signin">
          <SignButton onClick={handleSignIn}>Sign In</SignButton>
        </Link>
        <Link to="/signup">
          <SignButton onClick={handleSignUp}>Sign Up</SignButton>
        </Link>
      </center>
    </div>
  );
};

export default SignIn;
