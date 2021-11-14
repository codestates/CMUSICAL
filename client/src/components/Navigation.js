//* packages
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
//* components
import Logo from './Logo';
import Search from './Search';

export const Container = styled.div`
  display: flex;
  width: auto;
  min-height: 130px;
  border: 3px solid;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;

  > .box {
    display: flex;
    flex: none;
    width: 100px;
    height: auto;
    border: 3px solid red;
    align-items: center;
    justify-content: center;
    padding: 10px;
    flex-wrap: wrap;
  }

  > .logo {
    margin-right: auto;
  }
`;

export const SubNavi = styled.div`
  display: flex;
  display: ${(props) => (props.isHide ? 'none' : '')};
  flex-direction: column;
  width: 100px;
  min-height: auto;
  border: 3px solid blue;
  background-color: white;
  padding: 0 10px;
  position: absolute;
  right: 0%;

  > .menu {
    flex: none;
    width: auto;
    border: 3px solid;

    &:hover {
      background: #339af0;
    }
  }
`;

export default function Navigation() {
  const navigate = useNavigate();
  const [isHide, setHide] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const loginHandler = () => {
    window.sessionStorage.setItem('loggedInfo', true);
    setRefresh(!refresh);
  };

  const logoutHandler = () => {
    //! 로그아웃 요청 보내기
    window.sessionStorage.setItem('loggedInfo', false);
    navigate('/');
    setRefresh(!refresh);
  };

  return (
    <Container>
      <div className="box logo">
        <Logo />
      </div>
      <div className="box">
        <Search />
      </div>
      <div className="box" onClick={loginHandler}>
        {/*여기 토큰 있는지 없는지 여부만 판단하는 코드로 대체*/}
        {window.sessionStorage.getItem('loggedInfo') === 'true' ? (
          <div className="submenu" onMouseOver={() => setHide(false)}>
            <p>My Page</p>
          </div>
        ) : (
          <Link to="/signin">
            <p>Sign In</p>
          </Link>
        )}
      </div>
      <SubNavi isHide={isHide} onMouseLeave={() => setHide(true)}>
        <div className="menu">
          <Link to="/favorites">
            <span>Favorites</span>
          </Link>
        </div>
        <div className="menu">
          <Link to="/myinfo">
            <span>My Info</span>
          </Link>
        </div>
        <div className="menu">
          <span onClick={logoutHandler}>Sign Out</span>
        </div>
      </SubNavi>
    </Container>
  );
}
