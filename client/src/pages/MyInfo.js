//* packages
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
//* components
import { SignButton } from '../components/styles/SignButton.styled';
//* functions
import isValid from '../functions/isValid';
import isConflict from '../functions/isConflict';
import deleteMyInfo from '../functions/deleteMyInfo';
import editMyInfo from '../functions/editMyInfo';
import getMyInfo from '../functions/getMyInfo';

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

const MyInfo = () => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState({
    email: '',
    nickname: '',
  });
  const [values, setValues] = useState({
    username: 'dummyuser',
    email: '',
    nickname: '',
    password: '',
    confirm: '',
    oldPassword: '',
  });

  //! 유효성 검사 안내 메세지
  const [validationMsg, setValidationMsg] = useState({
    email: '',
    nickname: '',
  });

  //! 중복 검사 안내 메세지
  const [conflicationMsg, setConflicationMsg] = useState({
    email: '',
    nickname: '',
  });

  const handleInputValue = key => e => {
    // ! MyInfo에선 아이디를 받지 않아서 항상 오류가 나옴
    setValues({ ...values, username: 'dummyuser', [key]: e.target.value });
  };

  // !----------------------------------------------------------------!
  // TODO: 내 정보 가져오기
  useEffect(() => {
    async function getMyInfoFromAsync() {
      const myInfo = await getMyInfo();
      setValues(myInfo);
      setMyInfo(myInfo);
    }
    getMyInfoFromAsync();
  }, []);

  // !----------------------------------------------------------------!

  // TODO: 입력시 대기 후 서버에 데이터 충돌 확인
  const timeWait = useRef();
  useEffect(() => {
    clearTimeout(timeWait.current);
    timeWait.current = setTimeout(() => {
      // * useEffect 안에서 비동기 실행할 때 함수
      setValidationMsg(isValid(values));
    }, 1000);
  }, [values]);
  // 1. 실시간 검사 안하기 👿
  // 2. Myinfo 값과 동일하면 예외처리를 한다.

  // !----------------------------------------------------------------!
  // TODO: 회원 정보 수정

  const handleEditFormSubmit = event => {
    event.preventDefault();
    const validMsg = isValid(values);
    setValidationMsg(validMsg);
    // TODO: 유효성 검사 확인 후 회원 정보 수정 요청
    async function editMyInfoResultFromAsync() {
      const editResult = await editMyInfo(values);
      if (editResult) {
        console.log('회원 정보가 수정되었습니다.');
      } else {
        console.log(editResult);
      }
    }
    editMyInfoResultFromAsync();
  };

  // !----------------------------------------------------------------!
  // TODO: 회원 탈퇴
  const handleDeleteFormSubmit = event => {
    event.preventDefault();
    const validMsg = isValid(values);
    setValidationMsg(validMsg);
    // TODO: 유효성 검사 확인 후 회원 정보 수정 요청
    async function deleteMyInfoResultFromAsync() {
      const deleteResult = await deleteMyInfo(values);
      if (deleteResult) {
        console.log('회원 탈퇴 되었습니다.');
      } else {
        console.log(deleteResult);
      }
    }
    deleteMyInfoResultFromAsync();
  };
  // !----------------------------------------------------------------!

  return (
    <Container>
      <AppWrapper>
        <Link to="/">
          <Title>CMUSICAL</Title>
        </Link>
        <div className="form-wrapper">
          <div className="email">
            <label className="label">Email</label>
            <input className="input" type="email" name="email" value={values.email} onChange={handleInputValue('email')} />
            <p className="error">
              {validationMsg.email}
              {conflicationMsg.email}
              {/* {values.email === myInfo.email ? '' : conflicationMsg.email} */}
            </p>
          </div>
          <div className="nickname">
            <label className="label">Nickname</label>
            <input className="input" type="text" name="nickname" value={values.nickname} onChange={handleInputValue('nickname')} />
            <p className="error">
              {validationMsg.nickname}
              {conflicationMsg.nickname}
              {/* {values.nickname === myInfo.nickname ? '' : conflicationMsg.nickname} */}
            </p>
          </div>
          <div className="oldPassword">
            <label className="label">Password</label>
            <input className="input" type="password" name="oldPassword" onChange={handleInputValue('oldPassword')} />
            <p className="error"></p>
          </div>
          <div className="password">
            <label className="label">New Password</label>
            <input className="input" type="password" name="password" onChange={handleInputValue('password')} />
            <p className="error">
              {validationMsg.password}
              {/**/}
            </p>
          </div>
          <div className="confirm">
            <label className="label">New Password Confirm</label>
            <input className="input" type="password" name="confirm" onChange={handleInputValue('confirm')} />
            <p className="error">
              {validationMsg.confirm}
              {/**/}
            </p>
          </div>

          <div>
            <SignButton onClick={handleEditFormSubmit}>정보 수정</SignButton>
            <SignButton onClick={handleDeleteFormSubmit}>회원 탈퇴</SignButton>
          </div>
        </div>
      </AppWrapper>
    </Container>
  );
};

export default MyInfo;
