import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// 머지머지머지

axios.defaults.withCredentials = true;

export default function SignUp() {
  const [userinfo, setuserinfo] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
  });

  const [confirmPw, setConfirmPw] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //const navigate = useNavigate();

  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
  };

  const handleUsernameValidation = () => {
    const idReg = /^[a-z][a-z0-9]{3,15}$/g;
    if (!idReg.test(userinfo.username)) {
      console.log('failed');
    }
  };

  const handleNicknameValidation = () => {
    const nicknameReg = /^[가-힣a-zA-Z0-9]{2,10}$/g;
    if (!nicknameReg.test(userinfo.nickname)) {
      console.log('failed');
    }
  };

  const handleEmailValidation = () => {
    const emailReg = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailReg.test(userinfo.email)) {
      console.log('failed');
    }
  };

  const handlePasswordValidation = () => {
    const passwordReg = /^.{8,10}$/g;
    if (!passwordReg.test(userinfo.password)) {
      console.log('failed');
    }
    if (confirmPw.length > 0) {
      if (confirmPw === userinfo.password) {
        console.log('비밀번호가 일치합니다.');
      } else {
        console.log('비밀번호가 다릅니다.');
      }
    }
  };

  const handleConfirmPw = (e) => {
    setConfirmPw(e.target.value);
    if (userinfo.password !== e.target.value) {
      console.log('비밀번호가 다릅니다.');
    } else {
      console.log('비밀번호가 일치합니다.');
    }
  };

  const handleSignUp = () => {
    const { username, nickname, email, password, confirmPassword } = userinfo;
    if (!username || !nickname || !email || !password || !confirmPassword) {
      console.log('모든 항목은 필수입니다');
    }
    axios.post('https://localhost:4000/signup', { username, nickname, email, password, password }, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
      // console.log(res.data.message);
      //navigate('/');
    });
  };

  return (
    <div>
      <center>
        <h1>CMUSICAL</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <span>ID</span>
            <input type="text" onChange={handleInputValue('username')} />
            <button type="submit" onClick={handleUsernameValidation}>
              중복 검사
            </button>
          </div>
          <div>
            <span>Nickname</span>
            <input type="text" onChange={handleInputValue('nickname')} />
            <button type="submit" onClick={handleNicknameValidation}>
              중복 검사
            </button>
          </div>
          <div>
            <span>Email</span>
            <input type="email" onChange={handleInputValue('email')} />
            <button type="submit" onClick={handleEmailValidation}>
              중복 검사
            </button>
          </div>
          <div>
            <span>Password</span>
            <input type="password" onChange={handleInputValue('password')} />
            <span>오류 메세지</span>
            <div>
              <span>Confirm Password</span>
              <input type="password" value={confirmPw} onChange={handleConfirmPw} />
              <span>오류 메세지</span>
            </div>
          </div>
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
      </center>
    </div>
  );
}
