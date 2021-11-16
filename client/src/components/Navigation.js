//* packages
import React, { useState } from 'react';
import { StyledLink } from '../components/styles/Link.styled';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
//* components
import Logo from './Logo';

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

export default function Navigation({ handleFilter }) {
  const navigate = useNavigate();
  const [isHide, setHide] = useState(true);
  const [refresh, setRefresh] = useState(false);

  // TODO: 로그인 상태 변경함수 -> 토큰 있는지 없는지로
  const [isLogin, setIsLogin] = useState(false);
  const [text, setText] = useState('');

  const loginHandler = () => {
    window.sessionStorage.setItem('loggedInfo', true);
    setRefresh(!refresh);
  };

  const logoutHandler = () => {
    //! 로그아웃 요청 보내기
    // window.sessionStorage.setItem('loggedInfo', false);
    // navigate('/');
    // setRefresh(!refresh);
  };

  const handleText = (e) => {
    window.sessionStorage.setItem('Keyword', e.target.value);
    setText(e.target.value);
  };

  const clickBtn = () => {
    handleFilter(text);
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
      <div className="box" onClick={loginHandler}>
        {/*여기 토큰 있는지 없는지 여부만 판단하는 코드로 대체*/}
        {window.sessionStorage.getItem('loggedInfo') === 'true' ? (
          <div className="submenu" onMouseOver={() => setHide(false)}>
            <p>My Page</p>
          </div>
        ) : (
          <StyledLink to="/signin">
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
          <span onClick={logoutHandler}>Sign Out</span>
        </div>
      </SubNavi>
    </Container>
  );
}
