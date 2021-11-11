import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
// ! react-router-dom 6.0 이상 버전에서 Switch가 Routes로 바뀜
import Main from './pages/Main';
import MyFavorites from './pages/MyFavorites';
import MyInfo from './pages/MyInfo';

export default function APP() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  // ! react-router-dom 6.0 이상 버전에선 useHistory가 useNavigate로 바뀜

  const loginHandler = () => {
    setIsLogin(true);
  };

  const logoutHandler = () => {
    setIsLogin(false);
    navigate('/');
    // axios.post('로그아웃url', {}).then(() => { // 로그아웃 요청
    //   setIsLogin(false);
    //   navigate('/'); // 메인페이지로 돌아오기
    // });
  };

  return (
    <Routes>
      <Route path="/" element={<Main isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />} />
      <Route path="/favorites" element={<MyFavorites isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />} />
      <Route path="myinfo" element={<MyInfo isLogin={isLogin} logoutHandler={logoutHandler} />} />
    </Routes>
  );
}
