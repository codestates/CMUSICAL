import React, { useState } from 'react';
import { Logo } from './Logo';
import { Search } from './Search';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

export const Navigation = ({ isLogin, loginHandler, logoutHandler }) => {
  const [isHide, setHide] = useState(true);
  return (
    <Container>
      <div className="box logo">
        <Logo />
      </div>
      <div className="box">
        <Search />
      </div>
      <div className="box" onClick={loginHandler}>
        {window.sessionStorage.getItem('loggedInfo') === 'true' && isLogin ? (
          <div className="submenu" onMouseOver={() => setHide(false)}>
            <p>My Page</p>
          </div>
        ) : (
          // <Link to="/signin">
          //   <p>Sign In</p>
          // </Link>
          <p>Sign In</p>
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
};
