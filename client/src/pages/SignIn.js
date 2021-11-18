//* packages
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
//* components
import { Button } from '../components/styles/Button.styled';
import { StyledLink } from '../components/styles/Link.styled';
import { Container } from '../components/styles/Container.styled';

axios.defaults.withCredentials = true;

export const UserInfoBody = styled.div`
  width: 100%;
  /* border-top-style: 2px solid #bfa5a3;
  border-right-style: 2px solid #bfa5a3;
  border-left-style: 2px solid #bfa5a3; */
  border-right-style: 2px solid #bfa5a3;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

export const Title = styled.h2`
  border: 2px solid #bfa5a3;
  align-items: flex-start;
`;

export const Form = styled.div``;

export const InnerForm = styled.div``;

export const Label = styled.div``;

export const InputText = styled.input.attrs({
  type: 'text',
})`
  width: 100%;
  min-height: 33px;
  outline: none;
  border-top-style: none;
  border-right-style: none;
  border-left-style: none;
  border-bottom-style: 2px solid #bfa5a3;
  margin-bottom: 30px;
  font-size: 18px;
`;

export const InputPassword = styled.input.attrs({
  type: 'password',
})`
  width: 100%;
  min-height: 33px;
  outline: none;
  border-top-style: none;
  border-right-style: none;
  border-left-style: none;
  border-bottom-style: 2px solid #bfa5a3;
  margin-bottom: 30px;
  font-size: 18px;
`;

export const InputContainer = styled.div`
  margin: auto;
  padding: auto;
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
          return setErrorMessage('아이디 혹은 비밀번호를 확인하세요.');
        }
      });
  };

  return (
    <Container>
      <UserInfoBody>
        <Title>
          <StyledLink to="/">
            <h2>CMUSICAL</h2>
          </StyledLink>
        </Title>
        <Form>
          <InnerForm>
            <InputContainer>
              <Label>아이디</Label>
              <InputText type="text" onKeyUp={handleKeyUp} onChange={handleInputValue('username')} />
            </InputContainer>
            <InputContainer>
              <Label>비밀번호</Label>
              <InputPassword type="password" onKeyUp={handleKeyUp} onChange={handleInputValue('password')} />
            </InputContainer>
          </InnerForm>
          <div classNaem="error-message">{errorMessage}</div>
          <div className="button">
            <Button onClick={handleSignIn}>로그인</Button>
            <Link to="/signup">
              <Button>가입하기</Button>
            </Link>
          </div>
        </Form>
      </UserInfoBody>
    </Container>
  );
};

export default SignIn;
