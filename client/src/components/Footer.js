import React from 'react';
import Logo from './Logo';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 12rem;
  bottom: 0px;
  justify-content: space-around;
  position: absolute;
  background-color: #bfa5a3;
  color: #574240;

  > .logo {
    margin: 0 auto 0 15rem;
    padding: 4rem 0 0 0;
  }

  > .box {
    display: flex;
    flex-direction: column;
    margin: 0 2rem;
    padding: 2rem 6rem 0 0;

    > .list {
      display: flex;
      flex-direction: column;
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

// export const Container = styled.div
//   display: flex;
//   justify-content: space-around;
//   background-color: #bfa5a3;
//   color: #574240;
//   padding-right: 15rem;
//   position: absolute;
//   bottom: 0px;

//   > .logo {
//     margin-right: auto;
//     margin-left: 250px;
//     margin-top: 50px;
//   }

//   > .box {
//     display: flex;
//     flex-direction: column;
//     margin: 0.5rem 0 0 5rem;
//     > .list {
//       display: flex;
//       flex-direction: column;
//       align-items: flex-start;
//       padding-top: 0.4rem;
//       /* border: 1px solid; */
//     }
//   }
// `;

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
      <div className="logo">
        <Logo />
      </div>
      <div className="box">
        <div className="title">
          <h3>Services</h3>
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
