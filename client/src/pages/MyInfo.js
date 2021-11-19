//* packages
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { DoubleButton } from '../components/styles/Button.styled';
import Footer from '../components/Footer';
import EditModal from '../components/Modal/EditModal';
import DeleteModal from '../components/Modal/DeleteModal';

//* functions
import isValid from '../functions/isValid';
// import isConflict from '../functions/isConflict';
import deleteMyInfo from '../functions/deleteMyInfo';
import editMyInfo from '../functions/editMyInfo';
import getMyInfo from '../functions/getMyInfo';

axios.defaults.withCredentials = true;

//! Styled Components ------------------------------------------------------------//

export const MyInfoTitle = styled.h2`
  border: none;
  align-items: flex-start;
  height: 7vh;
`;

export const MyInfoButtonDiv = styled.div`
  margin: 50px;
`;

//! Pages ----------------------------------------------------------------------//

const MyInfo = ({ isLogin, loginHandler, logoutHandler }) => {
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

  const handleInputValue = (key) => (e) => {
    // ! MyInfo에선 아이디를 받지 않아서 항상 오류가 나옴
    setValues({ ...values, username: 'dummyuser', [key]: e.target.value });
  };

  //! 모달 상태관리
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // !----------------------------------------------------------------!
  // TODO: 내 정보 가져오기
  // * 로그인이 안된 경우 메인화면으로 돌려보냄
  useEffect(() => {
    async function getMyInfoFromAsync() {
      const myInfo = await getMyInfo();
      if (!myInfo) navigate('/');
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

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const validMsg = isValid(values, 'MyInfo');
    setValidationMsg(validMsg);
    // TODO: 유효성 검사 확인 후 회원 정보 수정 요청
    async function editMyInfoResultFromAsync() {
      const editResult = await editMyInfo(values);
      if (editResult) {
        console.log('회원 정보가 수정되었습니다.');
        setShowEditModal(true);
      } else {
        console.log(editResult);
      }
    }
    editMyInfoResultFromAsync();
  };

  // !----------------------------------------------------------------!
  // TODO: 회원 탈퇴
  const handleDeleteFormSubmit = (event) => {
    event.preventDefault();
    const validMsg = isValid(values, 'isMyInfo');
    setValidationMsg(validMsg);
    // TODO: 유효성 검사 확인 후 회원 정보 수정 요청
    async function deleteMyInfoResultFromAsync() {
      const deleteResult = await deleteMyInfo(values);
      if (deleteResult) {
        console.log('회원 탈퇴 되었습니다.');
        setShowDeleteModal(true);
      } else {
        console.log(deleteResult);
      }
    }
    deleteMyInfoResultFromAsync();
    // logoutHandler();
  };
  // !----------------------------------------------------------------!

  return (
    <>
      <Container>
        <Body>
          <UserInfoBody>
            <MyInfoTitle>
              <StyledLink black to="/">
                <h2>CMUSICAL</h2>
              </StyledLink>
            </MyInfoTitle>
            <div className="form">
              <div className="form-userinfo">
                <InputContainer>
                  <label>이메일</label>
                  <Input type="text" name="email" value={values ? values.email : ''} onChange={handleInputValue('email')} />
                  <ErrorMsg>
                    {validationMsg.email}
                    {conflicationMsg.email}
                    {/* {values.email === myInfo.email ? '' : conflicationMsg.email} */}
                  </ErrorMsg>
                </InputContainer>
                <InputContainer>
                  <label>닉네임</label>
                  <Input type="text" name="nickname" value={values ? values.nickname : ''} onChange={handleInputValue('nickname')} />
                  <ErrorMsg>
                    {validationMsg.nickname}
                    {conflicationMsg.nickname}
                    {/* {values.nickname === myInfo.nickname ? '' : conflicationMsg.nickname} */}
                  </ErrorMsg>
                </InputContainer>
                <InputContainer>
                  <label>현재 비밀번호</label>
                  <PasswordInput type="password" name="oldPassword" onChange={handleInputValue('oldPassword')} />
                  <p className="error"></p>
                </InputContainer>
                <InputContainer>
                  <label>새로운 비밀번호</label>
                  <PasswordInput type="password" name="password" onChange={handleInputValue('password')} />
                  <ErrorMsg>
                    {validationMsg.password}
                    {/**/}
                  </ErrorMsg>
                </InputContainer>
                <InputContainer>
                  <label>새로운 비밀번호 확인</label>
                  <PasswordInput type="password" name="confirm" onChange={handleInputValue('confirm')} />
                  <ErrorMsg>
                    {validationMsg.confirm}
                    {/**/}
                  </ErrorMsg>
                </InputContainer>
                <MyInfoButtonDiv>
                  <DoubleButton onClick={handleEditFormSubmit}>정보 수정</DoubleButton>
                  {showEditModal ? <EditModal showModal={showEditModal} setShowModal={setShowEditModal} /> : null}
                  <DoubleButton onClick={handleDeleteFormSubmit}>회원 탈퇴</DoubleButton>
                  {showDeleteModal ? <DeleteModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} /> : null}
                </MyInfoButtonDiv>
              </div>
            </div>
          </UserInfoBody>
        </Body>
        <Footer />
      </Container>
    </>
  );
};

export default MyInfo;
