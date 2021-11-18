//* packages
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
//* components
import { Button } from '../components/styles/Button.styled';
import { StyledLink } from '../components/styles/Link.styled';
import { Container } from '../components/styles/Container.styled';
import Footer from '../components/Footer';

axios.defaults.withCredentials = true;

const SignIn = ({ loginHandler }) => {
  const [signInInfo, setSignInInfo] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleInputValue = (key) => (e) => {
    setSignInInfo({ ...signInInfo, [key]: e.target.value });
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  const handleSignIn = () => {
    const { username, password } = signInInfo;

    if (!username || !password) {
      return setErrorMessage('아이디와 비밀번호를 입력하세요');
    }

    axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDR}/user/signin`,
        //
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((res) => {
        navigate('/');
        loginHandler();
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response) {
          return setErrorMessage('아이디 혹은 비밀번호를 확인하세요.');
        }
      });
  };

  return (
    <>
      <Container>
        <div>
          <div>
            <StyledLink to="/">
              <h1>CMUSICAL</h1>
            </StyledLink>
          </div>
          <div>
            <div>{errorMessage}</div>
            <div>
              <span>아이디</span>
            </div>
            <div>
              <input type="text" onKeyUp={handleKeyUp} onChange={handleInputValue('username')} />
            </div>
            <div>
              <span>비밀번호</span>
            </div>
            <div>
              <input type="password" onKeyUp={handleKeyUp} onChange={handleInputValue('password')} />
            </div>
            <div>
              <Button onClick={handleSignIn}>로그인</Button>
              <Link to="/signup">
                <Button>가입하기</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default SignIn;
