//* packages
import React from 'react';
//* components
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// oldPassword, newPassword
// axios.get/myinfo 닉네임, 이메일만 칸 채워져있고
// axios.patch/myinfo 현재 비번, 새로운 비번, 새로운 비번 확인 칸은 비워놓기
// 수정완료 -> 닉네임, 이메일, 비밀번호, 새로운 비밀번호 다 보내기

export default function MyInfo() {
  return (
    <div id="container">
      <div id="header">
        <Navigation />
      </div>
      <div id="body">내정보당</div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
