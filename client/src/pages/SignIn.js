//* packages
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
//* components
import { StyledLink } from '../components/styles/Link.styled';
import { Container } from '../components/styles/Container.styled';
import { Body } from '../components/styles/Body.styled';
import { UserInfoBody } from '../components/styles/UserInfo.styled';
import { Title } from '../components/styles/UserInfo.styled';
import { InputContainer } from '../components/styles/UserInfo.styled';
import { Input } from '../components/styles/UserInfo.styled';
import { PasswordInput } from '../components/styles/UserInfo.styled';
import { DoubleButton } from '../components/styles/Button.styled';
import Footer from '../components/Footer';

axios.defaults.withCredentials = true;

export const SignInErrMsg = styled.div`
  color: #bfa5a3;
  margin: 10px 30px;
`;

export const DoubleButtonDiv = styled.div`
  margin: 30px;
`;

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
          return setErrorMessage('아이디 혹은 비밀번호를 확인하세요');
        }
      });
  };

  return (
    <>
      <Container>
        <Body>
          <UserInfoBody>
            <Title>
              <StyledLink black to="/">
                <h2>CMUSICAL</h2>
              </StyledLink>
            </Title>
            <div className="form">
              <div className="form-userInfo">
                <InputContainer>
                  <label>아이디</label>
                  <Input type="text" onKeyUp={handleKeyUp} onChange={handleInputValue('username')} />
                </InputContainer>
                <InputContainer>
                  <label>비밀번호</label>
                  <PasswordInput type="password" onKeyUp={handleKeyUp} onChange={handleInputValue('password')} />
                </InputContainer>
              </div>
              <SignInErrMsg>{errorMessage}</SignInErrMsg>
              <DoubleButtonDiv>
                <DoubleButton onClick={handleSignIn}>로그인</DoubleButton>
                <Link to="/signup">
                  <DoubleButton>가입하기</DoubleButton>
                </Link>
              </DoubleButtonDiv>
            </div>
          </UserInfoBody>
        </Body>
        <Footer />
      </Container>
    </>
  );
};

export default SignIn;
