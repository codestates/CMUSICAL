import React from 'react';
import Logo from './Logo';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: auto;
  height: 20vh;
  justify-content: space-around;
  align-items: center;
  background-color: #bfa5a3;
  color: #574240;
  padding-right: 15rem;

  > .logo {
    margin-right: auto;
    margin-left: 100px;
  }

  > .box {
    display: flex;
    flex-direction: column;
    height: 15vh;
    padding-right: 300rem;

    > .list {
      display: flex;
      flex-direction: column;
      padding-top: 10px;
    }
  }
`;

const Span = styled.span`
  font-size: 1rem;
`;

const Anchor = styled(Span.withComponent('a'))`
  padding: 4px;
  text-decoration: none;
  color: #574240;
  &:visited {
    color: #574240;
  }
`;

export default function Footer() {
  const infomation = [
    { title: 'Repository', url: 'https://github.com/codestates/cmusical' },
    { title: 'WIki', url: 'https://github.com/codestates/CMUSICAL/wiki' },
  ];
  const members = [
    { name: 'Lee SeungHun', url: 'https://github.com/shleecloud' },
    { name: 'Kim YunJin', url: 'https://github.com/yunjink' },
    { name: 'Seo EunYu', url: 'https://github.com/EUNYUSEO' },
    { name: 'Park JinHyuck', url: 'https://github.com/hyucki' },
  ];

  return (
    <Container>
      <div className="logo">
        <Logo />
      </div>
      <div className="box">
        <div className="title">
          <h3>Services</h3>
        </div>
        <div className="list">
          {infomation.map((el, idx) => {
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
