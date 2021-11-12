import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
// ! react-router-dom 6.0 이상 버전에서 Switch가 Routes로 바뀜
// ! react-router-dom 6.0 이상 버전에선 useHistory가 useNavigate로 바뀜
import Main from './pages/Main';
import MyFavorites from './pages/MyFavorites';
import MyInfo from './pages/MyInfo';
import SignIn from './pages/SignIn';
import MusicalInfo from './pages/MusicalInfo';

export default function APP() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const loginHandler = () => {
    window.sessionStorage.setItem('loggedInfo', true);
    setIsLogin(true);
  };

  const logoutHandler = () => {
    window.sessionStorage.setItem('loggedInfo', false);
    setIsLogin(false);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<Main isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />} />
      <Route path="/favorites" element={<MyFavorites isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />} />
      <Route path="/myinfo" element={<MyInfo isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/musicalinfo/:id" element={<MusicalInfo isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />} />
    </Routes>
  );
}
