import React from 'react';
import Logo from './Logo';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 12rem;
  bottom: 0px;
  position: absolute;
  border: 1px solid;
`;
const Span = styled.span``;
const Anchor = styled(Span.withComponent('a'))``;

// export const Container = styled.div
//   display: flex;
//   height: 12rem;
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
// TODO: 추후 적용할 Footer CSS
// const Span = styled.span`
//   font-size: 1rem;
// `;

// const Anchor = styled(Span.withComponent('a'))`
//   padding-bottom: 4px;
//   text-decoration: none;
//   color: #574240;
//   &:visited {
//     color: #574240;
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
