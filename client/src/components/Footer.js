import React from 'react';
import { Logo } from './Logo';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: auto;
  min-height: 150px;
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

const Span = styled.span``;

const Anchor = styled(Span.withComponent('a'))`
  text-decoration: none;
`;

export const Footer = () => {
  return (
    <Container>
      <div className="box logo">
        <Logo />
      </div>
      <div className="box">
        서비스 소개
        <Anchor href="https://github.com/codestates/cmusical" target="_blank">
          Repository
        </Anchor>
        <Anchor href="https://github.com/codestates/CMUSICAL/wiki" target="_blank">
          Wiki
        </Anchor>
      </div>
      <div className="box">
        Team Members
        <Anchor href="https://github.com/shleecloud" target="_blank">
          Lee SeungHun
        </Anchor>
        <Anchor href="https://github.com/yunjink" target="_blank">
          Kim YunJin
        </Anchor>
        <Anchor href="https://github.com/EUNYUSEO" target="_blank">
          Seo EunYu
        </Anchor>
        <Anchor href="https://github.com/hyucki" target="_blank">
          Park JinHyuck
        </Anchor>
      </div>
    </Container>
  );
};
