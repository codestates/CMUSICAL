//* packages
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//* components
import { Button } from '../components/styles/Button.styled';
import { StyledLink } from '../components/styles/Link.styled';
import EditModal from '../components/Modal/EditModal';
import DeleteModal from '../components/Modal/DeleteModal';

//* functions
import isValid from '../functions/isValid';
// import isConflict from '../functions/isConflict';
import deleteMyInfo from '../functions/deleteMyInfo';
import editMyInfo from '../functions/editMyInfo';
import getMyInfo from '../functions/getMyInfo';

axios.defaults.withCredentials = true;

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
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModal);
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

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const validMsg = isValid(values);
    setValidationMsg(validMsg);
    // TODO: 유효성 검사 확인 후 회원 정보 수정 요청
    async function editMyInfoResultFromAsync() {
      const editResult = await editMyInfo(values);
      if (editResult) {
        console.log('회원 정보가 수정되었습니다.');
        openModal();
      } else {
        console.log('edit', editResult);
      }
    }
    editMyInfoResultFromAsync();
  };

  // !----------------------------------------------------------------!
  // TODO: 회원 탈퇴
  const handleDeleteFormSubmit = (event) => {
    event.preventDefault();
    const validMsg = isValid(values);
    setValidationMsg(validMsg);
    // TODO: 유효성 검사 확인 후 회원 정보 수정 요청
    async function deleteMyInfoResultFromAsync() {
      const deleteResult = await deleteMyInfo(values);
      if (deleteResult) {
        logoutHandler();
        openModal();
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
      <StyledLink to="/">
        <h1>CMUSICAL</h1>
      </StyledLink>
      <div className="form-wrapper">
        <div className="email">
          <label className="label">이메일</label>
          <input className="input" type="email" name="email" value={values.email} onChange={handleInputValue('email')} />
          <p className="error">
            {validationMsg.email}
            {conflicationMsg.email}
            {/* {values.email === myInfo.email ? '' : conflicationMsg.email} */}
          </p>
        </div>
        <div className="nickname">
          <label className="label">닉네임</label>
          <input className="input" type="text" name="nickname" value={values.nickname} onChange={handleInputValue('nickname')} />
          <p className="error">
            {validationMsg.nickname}
            {conflicationMsg.nickname}
            {/* {values.nickname === myInfo.nickname ? '' : conflicationMsg.nickname} */}
          </p>
        </div>
        <div className="oldPassword">
          <label className="label">현재 비밀번호</label>
          <input className="input" type="password" name="oldPassword" onChange={handleInputValue('oldPassword')} />
          <p className="error"></p>
        </div>
        <div className="password">
          <label className="label">새로운 비밀번호</label>
          <input className="input" type="password" name="password" onChange={handleInputValue('password')} />
          <p className="error">
            {validationMsg.password}
            {/**/}
          </p>
        </div>
        <div className="confirm">
          <label className="label">새로운 비밀번호 확인</label>
          <input className="input" type="password" name="confirm" onChange={handleInputValue('confirm')} />
          <p className="error">
            {validationMsg.confirm}
            {/**/}
          </p>
        </div>
        <div>
          <Button onClick={handleEditFormSubmit}>정보 수정</Button>
          {showModal ? <EditModal showModal={showModal} setShowModal={setShowModal} /> : null}
          <Button onClick={handleDeleteFormSubmit}>회원 탈퇴</Button>
          {showModal ? <DeleteModal showModal={showModal} setShowModal={setShowModal} /> : null}
        </div>
      </div>
    </>
  );
};

export default MyInfo;
