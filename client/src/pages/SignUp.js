//* packages
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
//* components
import { StyledLink } from '../components/styles/Link.styled';
import { Container } from '../components/styles/Container.styled';
import { Body } from '../components/styles/Body.styled';
import { UserInfoBody } from '../components/styles/UserInfo.styled';
import { InputContainer } from '../components/styles/UserInfo.styled';
import { Input } from '../components/styles/UserInfo.styled';
import { PasswordInput } from '../components/styles/UserInfo.styled';
import { ErrorMsg } from '../components/styles/UserInfo.styled';
import { SingleButton } from '../components/styles/Button.styled';
import SignUpSuccessModal from '../components/Modal/SignUpSuccessModal';
import Footer from '../components/Footer';
//* functions
import isValid from '../functions/isValid';
import isConflict from '../functions/isConflict';
import submitSignUp from '../functions/submitSignUp';

axios.defaults.withCredentials = true;

//! Styled Components ------------------------------------------------------------//

export const SignUpTitle = styled.h2`
  border: none;
  align-items: flex-start;
  height: 7vh;
`;

export const SingleButtonDiv = styled.div`
  margin: 50px 10px;
`;

//! Pages ----------------------------------------------------------------------//

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
    if (Object.keys(validMsg).length !== 0) return;
    async function setSignUpResultFromAsync() {
      const submitMsg = await submitSignUp(values);
      if (submitMsg.result) {
        openModal();
        console.log('회원 가입을 축하합니다.');
      } else {
        setConflicationMsg(submitMsg.conflictMsg);
      }
    }
    setSignUpResultFromAsync();
  };

  // !----------------------------------------------------------------!

  return (
    <>
      <Container>
        <Body>
          <UserInfoBody>
            <SignUpTitle>
              <StyledLink black to="/">
                <h2>CMUSICAL</h2>
              </StyledLink>
            </SignUpTitle>
            <div className="form">
              <div className="form-userInfo">
                <InputContainer>
                  <label>아이디</label>
                  <Input type="text" name="username" onChange={handleInputValue('username')} />
                  <ErrorMsg>
                    {validationMsg.username}
                    {conflicationMsg.username}
                  </ErrorMsg>
                </InputContainer>
                <InputContainer>
                  <label>이메일</label>
                  <Input type="text" name="email" onChange={handleInputValue('email')} />
                  <ErrorMsg>
                    {validationMsg.email}
                    {conflicationMsg.email}
                  </ErrorMsg>
                </InputContainer>
                <InputContainer>
                  <label>닉네임</label>
                  <Input type="text" name="nickname" onChange={handleInputValue('nickname')} />
                  <ErrorMsg>
                    {validationMsg.nickname}
                    {conflicationMsg.nickname}
                  </ErrorMsg>
                </InputContainer>
                <InputContainer>
                  <label>비밀번호</label>
                  <PasswordInput type="password" name="password" onChange={handleInputValue('password')} />
                  <ErrorMsg>
                    {validationMsg.password}
                    {/**/}
                  </ErrorMsg>
                </InputContainer>
                <InputContainer>
                  <label>비밀번호 확인</label>
                  <PasswordInput type="password" name="confirm" onChange={handleInputValue('confirm')} />
                  <ErrorMsg>
                    {validationMsg.confirm}
                    {/**/}
                  </ErrorMsg>
                </InputContainer>
              </div>
              <SingleButtonDiv>
                <SingleButton onClick={handleFormSubmit}>가입하기</SingleButton>
                {showModal ? <SignUpSuccessModal showModal={showModal} setShowModal={setShowModal} /> : null}
              </SingleButtonDiv>
            </div>
          </UserInfoBody>
        </Body>
        <Footer />
      </Container>
    </>
  );
};

export default SignUp;
