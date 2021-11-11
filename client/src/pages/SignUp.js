import React, { useState } from 'react';

const SignUp = () => {
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cofirmPw, setConfirmPw] = useState('');

  const handleUserId = (e) => {
    setUserId(e.target.value);
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPw = (e) => {
    setConfirmPw(e.target.value);
  };

  const handleSignUp = () => {
    console.log('Sign Up');
  };

  return (
    <center>
      <h1>CMUSICAL</h1>
      <div>
        <span>ID</span>
        <input type="text" value={userId} onChange={handleUserId} />
        <span>4자 이상 16자 미만 / 중복된 아이디입니다.</span>
      </div>
      <div>
        <span>Nickname</span>
        <input type="text" value={nickname} onChange={handleNickname} />
        <span>10자 미만 / 중복된 닉네임입니다.</span>
      </div>
      <div>
        <span>Email</span>
        <input type="email" value={email} onChange={handleEmail} />
        <span>이메일 형식을 확인해주세요. / 중복된 이메일입니다. </span>
      </div>
      <div>
        <span>Password</span>
        <input type="password" value={password} onChange={handlePassword} />
        <span>8자 이상</span>
        <span>Confirm Password</span>
        <input type="password" value={cofirmPw} onChange={handleConfirmPw} />
        <span>비밀번호가 다릅니다.</span>
      </div>
      <button type="button" onClick={handleSignUp}>
        Sign Up
      </button>
    </center>
  );
};

export default SignUp;
