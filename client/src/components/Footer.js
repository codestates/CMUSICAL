import React from 'react';
import Logo from './Logo';
import styled from 'styled-components';
import { Container } from '../components/styles/Container.styled';

// export const Container = styled.div`
//   display: flex;
//   width: auto;
//   min-height: 150px;
//   border: 3px solid;
//   flex-wrap: wrap;
//   > .box {
//     display: flex;
//     width: 300px;
//     height: auto;
//     align-items: center;
//     justify-content: space-evenly;
//     flex-wrap: wrap;
//     margin: 0 5px;
//     > .box-body {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//     }
//   }
//   > .logo {
//     margin-right: auto;
//   }
// `;

const Span = styled.span``;

const Anchor = styled(Span.withComponent('a'))`
  padding: 4px;
  text-decoration: none;
  &:visited {
    color: black;
  }
`;

export default function Footer() {
  const information = [
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
      <div className="box logo">
        <Logo />
      </div>
      <div className="box">
        <div className="box-header">
          <h3>서비스 소개</h3>
        </div>
        <div className="box-body">
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
        <div className="box-header">
          <h3>Team Members</h3>
        </div>
        <div className="box-body">
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
