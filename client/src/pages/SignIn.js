//* packages
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
//* components
import { SignButton } from '../components/styles/SignButton.styled';

axios.defaults.withCredentials = true;

export const AlertBox = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;

  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
`;

const SignIn = () => {
  const [signInInfo, setSignInInfo] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleInputValue = (key) => (e) => {
    setSignInInfo({ ...signInInfo, [key]: e.target.value });
  };

  const handleSignIn = () => {
    const { username, password } = signInInfo;

    if (!username || !password) {
      return setErrorMessage('아이디와 비밀번호를 입력하세요');
    }

    axios.post('https://localhost:4000/user/signin', { username, password }, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
      const token = res.data.data;
      if (res.status === 400) {
        return setErrorMessage('아이디 혹은 비밀번호를 확인하세요.');
      }
      if (res.status === 200) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/');
      }
    });
  };

  return (
    <div>
      <center>
        <h1>CMUSICAL</h1>
        <div>
          <AlertBox>{errorMessage}</AlertBox>
          <span>ID</span>
          <input type="text" onChange={handleInputValue('username')} />
        </div>
        <div>
          <span>Password</span>
          <input type="password" onChange={handleInputValue('password')} />
        </div>
        <div>
          <SignButton onClick={handleSignIn}>Sign In</SignButton>
        </div>
        <Link to="/signup">
          <SignButton>Sign Up</SignButton>
        </Link>
      </center>
    </div>
  );
};

export default SignIn;
