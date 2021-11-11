import React from 'react';
import { Logo } from './Logo';
import { Search } from './Search';
import styled from 'styled-components';

export const Container = styled.div`
  border: 3px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 130px;
  padding: 0 30px;

  > .box {
    width: 100px;
    height: auto;
    border: 3px solid red;
    display: flex;
    align-items: center;
    padding: 10px;
    margin: 0 20px;
  }

  > .logo {
    margin-right: 800px;
  }
`;

export const Navigation = ({ isLogin, loginHandler }) => {
  return (
    <>
      <Container>
        <div className="box logo">
          <Logo />
        </div>
        <div className="box search">
          <Search />
        </div>
        <div className="box text" onClick={loginHandler}>
          {isLogin ? <p>Mypage</p> : <p>Signin</p>}
        </div>
      </Container>
    </>
  );
};
