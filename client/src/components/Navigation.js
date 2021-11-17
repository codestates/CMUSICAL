import React, { useState } from 'react';
import { StyledLink } from '../components/styles/Link.styled';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './Logo';
import axios from 'axios';

export const Container = styled.div`
  display: flex;
  width: auto;
  height: 7vh;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 250px;
  background-color: #8d1323;

  > .box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    flex-wrap: wrap;
  }

  > .logo {
    margin-right: auto;
  }

  .search {
    margin-right: 2vh;
  }

  .submenu {
    position: relative;
  }

  span {
    font-size: 20px;
    color: #bfa5a3;
    font-weight: bold;
  }
`;

export const Input = styled.input.attrs({})`
  width: 200px;
  min-height: 27px;
  outline: none;
  border: none;
  border-radius: 20px;
`;

export const Button = styled.button`
  background-color: #8d1323;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  margin: 0 5px;
`;

export const SubNavi = styled.div`
  display: ${(props) => (props.isHide ? 'none' : '')};
  flex-direction: column;
  width: 100px;
  border-radius: 10px;
  background-color: #574240;
  padding: 10px;
  position: absolute;
  z-index: 2;

  > .menu {
    width: 100px;
    margin-bottom: 5px;

    &:hover {
      opacity: 0.4;
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

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      clickBtn();
    }
    if (e.key === 'Escape') {
      setText('');
      clickBtn();
    }
  };

  const handleSignOutBtn = () => {
    axios.post(`${process.env.REACT_APP_SERVER_ADDR}/user/signout`).then((res) => {
      logoutHandler();
      navigate('/');
    });
  };

  return (
    <Container>
      <div className="box logo">
        <Logo />
      </div>
      <div className="box search">
        <Input type="search" value={window.sessionStorage.getItem('Keyword')} onKeyUp={handleKeyUp} onChange={handleText} />
        <Button onClick={clickBtn}>🔍</Button>
      </div>
      <div className="box">
        {isLogin ? (
          <div className="submenu" onMouseOver={() => setHide(false)}>
            <span>My Page</span>
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
          </div>
        ) : (
          <StyledLink to="/signin" isLogin={isLogin} loginHandler={loginHandler}>
            <span>Sign In</span>
          </StyledLink>
        )}
      </div>
    </Container>
  );
}
