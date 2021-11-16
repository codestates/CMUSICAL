//* packages
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
//* components
import Main from './pages/Main';
import MyFavorites from './pages/MyFavorites';
import MyInfo from './pages/MyInfo';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MusicalInfo from './pages/MusicalInfo';

export default function APP() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const loginHandler = () => {
    setIsLogin(true);
  };

  const logoutHandler = () => {
    axios.post(`${process.env.REACT_APP_SERVER_ADDR}/user/signout`).then((res) => {
      console.log('success');
      setIsLogin(false);
      navigate('/');
    });
  };

  useEffect(() => {
    loginHandler();
  }, []);

  return (
    <>
      <Routes>
        <>
          <Route
            path="/"
            element={
              <>
                <Main isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <>
                <MyFavorites isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />
              </>
            }
          />
          <Route
            path="/myinfo"
            element={
              <>
                <MyInfo />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <SignIn isLogin={isLogin} loginHandler={loginHandler} />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <SignUp />
              </>
            }
          />
          <Route
            path="/musicalinfo/:id"
            element={
              <>
                <MusicalInfo isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />
              </>
            }
          />
        </>
      </Routes>
    </>
  );
}
