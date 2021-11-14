//* packages
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
//* components
import { SignButton } from '../components/styles/SignButton.styled';
//* functions
import validation from '../functions/validation';

axios.defaults.withCredentials = true;

export const Container = styled.div`
  background: linear-gradient(135deg, #850c62, #f80759);
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AppWrapper = styled.div`
  background-color: #fff;
  min-width: 350px;
  min-width: 650px;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 5px;
`;

export const Title = styled.div`
  color: #f80759;
  text-align: center;
  margin: 80px 0px 40px 0px;
`;

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

const SignUp = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    email: '',
    nickname: '',
    password: '',
    confirm: '',
  });

  const handleInputValue = (key) => (e) => {
    setValues({ ...values, [key]: e.target.value });
  };

  //! 유효성 검사 안내 메세지
  const [validationMsg, setValidationMsg] = useState({});

  //! 중복 검사 안내 메세지
  const [duplicationMsg, setDuplicationMsg] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setValidationMsg(validation(values));

    const { username, email, nickname, password } = values;
    axios
      .post(
        'https://localhost:4000/user/signup',
        //
        { username, email, nickname, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((res) => {
        if (res.status === 200) {
          return navigate('/signin');
          // TODO: "회원가입이 완료되었습니다" 모달창
        }
      })
      .catch((err) => {
        // TODO: 서버에서 리팩토링 된 메세지 보고 중복안내메세지 띄우기
        // console.log('이것은 err.response', err.response);
        if (err.response.status === 409) {
          if (err.response.data.message === 'conflict username') {
            return setDuplicationMsg('중복된 아이디입니다.');
          }
        }
        // if (err.response.status === 409 && err.response.data.message === 'conflict username') {
        //   return setDuplicationMsg('중복된 아이디입니다.');
        // } else if (err.response.status === 409 && err.response.data.message === 'conflict email') {
        //   return setDuplicationMsg('중복된 이메일입니다.');
        // } else if (err.response.status === 409 && err.response.data.message === 'conflict nickname') {
        //   return setDuplicationMsg('중복된 닉네임입니다.');
        // }
      });
  };

  return (
    <Container>
      <AppWrapper>
        <Link to="/">
          <Title>CMUSICAL</Title>
        </Link>
        <form className="form-wrapper">
          <AlertBox>{duplicationMsg}</AlertBox>
          <div className="username">
            <label className="label">ID</label>
            <input className="input" type="text" name="username" onChange={handleInputValue('username')} />
            {validationMsg.username && <p className="error">{validationMsg.username}</p>}
          </div>
          <div className="email">
            <label className="label">Email</label>
            <input className="input" type="email" name="email" onChange={handleInputValue('email')} />
            {validationMsg.email && <p className="error">{validationMsg.email}</p>}
          </div>
          <div className="nickname">
            <label className="label">Nickname</label>
            <input className="input" type="text" name="nickname" onChange={handleInputValue('nickname')} />
            {validationMsg.nickname && <p className="error">{validationMsg.nickname}</p>}
          </div>
          <div className="password">
            <label className="label">Password</label>
            <input className="input" type="password" name="password" onChange={handleInputValue('password')} />
            {validationMsg.password && <p className="error">{validationMsg.password}</p>}
          </div>
          <div className="confirm">
            <label className="label">Confirm</label>
            <input className="input" type="password" name="confirm" onChange={handleInputValue('confirm')} />
            {validationMsg.confirm && <p className="error">{validationMsg.confirm}</p>}
          </div>
          <div>
            <SignButton onClick={handleFormSubmit}>Sign Up</SignButton>
          </div>
        </form>
      </AppWrapper>
    </Container>
  );
};

export default SignUp;
