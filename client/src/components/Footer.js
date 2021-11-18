import React from 'react';
import Logo from './Logo';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 10rem;
  bottom: 0px;
  justify-content: center;
  position: absolute;
  background-color: #bfa5a3;
  color: #574240;
  padding: 1rem 0 0 0;

  > .logo {
    margin: 0 40rem 0 0;
    h2 {
      text-align: left;
    }
  }

  > .box {
    display: flex;
    flex-direction: column;
    padding: 0 3rem 0 0;

    > .list {
      display: flex;
      flex-direction: column;
      padding-top: 0.7rem;
    }
  }
`;

const Span = styled.span`
  font-size: 1rem;
`;

const Anchor = styled(Span.withComponent('a'))`
  padding-bottom: 4px;
  text-decoration: none;
  color: #574240;
  &:visited {
    color: #574240;
  }
`;

export default function Footer() {
  const information = [
    { title: 'Repository', url: 'https://github.com/codestates/cmusical' },
    { title: 'WIki', url: 'https://github.com/codestates/CMUSICAL/wiki' },
  ];
  const members = [
    { name: 'Lee SeungHoon', url: 'https://github.com/shleecloud' },
    { name: 'Kim YunJin', url: 'https://github.com/yunjink' },
    { name: 'Seo EunYu', url: 'https://github.com/EUNYUSEO' },
    { name: 'Park JinHyuck', url: 'https://github.com/hyucki' },
  ];

  return (
    <Container>
      <div className="logo">
        <Logo />
        <div>자료 출처: (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)</div>
      </div>
      <div className="box">
        <div className="title">
          <h3>About us</h3>
        </div>
        <div className="list">
          {information.map((el, idx) => {
            return (
              <Anchor key={idx} href={el.url} target="_blank">
                {el.title}
              </Anchor>
            );
          })}
        </div>
      </div>
      <div className="box">
        <div className="title">
          <h3>Team Members</h3>
        </div>
        <div className="list">
          {members.map((member, idx) => {
            return (
              <Anchor key={idx} href={member.url} target="_blank">
                {member.name}
              </Anchor>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
