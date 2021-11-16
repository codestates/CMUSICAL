//* packages
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
//* components
import { SignButton } from '../components/styles/SignButton.styled';
import Modal from '../components/Modal';

//* functions
import isValid from '../functions/isValid';
import isConflict from '../functions/isConflict';
import submitSignUp from '../functions/submitSignUp';

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
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
`;

const SignUp = () => {
  //! 회원 가입시 입력 사항
  const [values, setValues] = useState({
    username: '',
    email: '',
    nickname: '',
    password: '',
    confirm: '',
  });

  //! 유효성 검사 안내 메세지
  const [validationMsg, setValidationMsg] = useState({
    usernmae: '',
    email: '',
    nickname: '',
  });

  //! 중복 검사 안내 메세지
  const [conflicationMsg, setConflicationMsg] = useState({
    username: '',
    email: '',
    nickname: '',
  });

  //! 모달 상태관리
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
  };

  // !----------------------------------------------------------------!

  // TODO: 입력시 대기 후 서버에 데이터 충돌 확인
  const timeWait = useRef();
  useEffect(() => {
    clearTimeout(timeWait.current);
    timeWait.current = setTimeout(() => {
      // * useEffect 안에서 비동기 실행할 때 함수
      async function setConflictationMsgFromAsync() {
        setConflicationMsg(await isConflict(values));
      }
      setConflictationMsgFromAsync();
      console.log(isValid(values));
      setValidationMsg(isValid(values));
    }, 1000);
  }, [values]);

  // !----------------------------------------------------------------!

  const handleInputValue = (key) => (e) => {
    setValues({ ...values, [key]: e.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const validMsg = isValid(values);
    console.log(validMsg);
    setValidationMsg(validMsg);
    // TODO: 유효성 검사 확인 후 회원 가입 요청
    console.log(validMsg);
    if (Object.keys(validMsg).length !== 0) return;
    async function setSignUpResultFromAsync() {
      const submitMsg = await submitSignUp(values);
      if (submitMsg.result) {
        //openModal();
        console.log('회원 가입을 축하합니다.');
      } else {
        console.log(submitMsg);
        setConflicationMsg(submitMsg.conflictMsg);
      }
    }
    setSignUpResultFromAsync();
  };

  // !----------------------------------------------------------------!

  // !----------------------------------------------------------------!

  return (
    <>
      <Container>
        <Link to="/">
          <Title>CMUSICAL</Title>
        </Link>
        <div className="form-wrapper">
          <div className="username">
            <label className="label">ID</label>
            <input className="input" type="text" name="username" onChange={handleInputValue('username')} />
            <p className="error">
              {validationMsg.username}
              {conflicationMsg.username}
            </p>
          </div>
          <div className="email">
            <label className="label">Email</label>
            <input className="input" type="email" name="email" onChange={handleInputValue('email')} />
            <p className="error">
              {validationMsg.email}
              {conflicationMsg.email}
            </p>
          </div>
          <div className="nickname">
            <label className="label">Nickname</label>
            <input className="input" type="text" name="nickname" onChange={handleInputValue('nickname')} />
            <p className="error">
              {validationMsg.nickname}
              {conflicationMsg.nickname}
            </p>
          </div>
          <div className="password">
            <label className="label">Password</label>
            <input className="input" type="password" name="password" onChange={handleInputValue('password')} />
            <p className="error">
              {validationMsg.password}
              {/**/}
            </p>
          </div>
          <div className="confirm">
            <label className="label">Confirm</label>
            <input className="input" type="password" name="confirm" onChange={handleInputValue('confirm')} />
            <p className="error">
              {validationMsg.confirm}
              {/**/}
            </p>
          </div>
          <div>
            <SignButton onClick={handleFormSubmit}>Sign Up</SignButton>
          </div>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </Container>
    </>
  );
};

export default SignUp;
