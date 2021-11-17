//* packages
import React, { useState } from 'react';
import { StyledLink } from '../components/styles/Link.styled';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
//* components
import Logo from './Logo';
import axios from 'axios';

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

  > .search {
    width: 200px;
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

export default function Navigation({ handleFilter, isLogin, loginHandler, logoutHandler }) {
  const navigate = useNavigate();
  const [isHide, setHide] = useState(true);
  const [text, setText] = useState('');

  const handleText = (e) => {
    window.sessionStorage.setItem('Keyword', e.target.value);
    setText(e.target.value);
  };

  const clickBtn = () => {
    handleFilter(text);
  };

  const handleSignOutBtn = () => {
    axios.post(`${process.env.REACT_APP_SERVER_ADDR}/user/signout`).then((res) => {
      console.log('로그아웃 버튼');
      logoutHandler();
      console.log('아무거나');
      navigate('/');
    });
  };

  return (
    <Container>
      <div className="box logo">
        <Logo />
      </div>
      <div className="box search">
        <input type="search" value={window.sessionStorage.getItem('Keyword')} onChange={handleText} />
        <button onClick={clickBtn}>🔍</button>
      </div>
      <div className="box">
        {isLogin ? (
          <div className="submenu" onMouseOver={() => setHide(false)}>
            <p>My Page</p>
          </div>
        ) : (
          <StyledLink to="/signin" isLogin={isLogin} loginHandler={loginHandler}>
            <p>Sign In</p>
          </StyledLink>
        )}
      </div>
      <SubNavi isHide={isHide} onMouseLeave={() => setHide(true)}>
        <div className="menu">
          <StyledLink to="/favorites">
            <span>Favorites</span>
          </StyledLink>
        </div>
        <div className="menu">
          <StyledLink to="/myinfo">
            <span>My Info</span>
          </StyledLink>
        </div>
        <div className="menu">
          <span onClick={handleSignOutBtn}>Sign Out</span>
        </div>
      </SubNavi>
    </Container>
  );
}
