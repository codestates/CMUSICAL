import React, { useState } from 'react';
import Posters from '../components/Posters';
import Comments from '../components/Comments';
import styled from 'styled-components';

const TabMenu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid red;
  list-style: none;
  min-height: 100%;

  .submenu {
    min-height: 100%;
    width: 100%;
    text-align: center;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }

  .focused {
    background-color: lavenderblush;
  }
`;

const Content = styled.div`
  background-color: lavenderblush;
`;

export default function Tab({ images }) {
  const [curTab, setCurTab] = useState(0);

  const tabArr = [
    {
      name: 'Posters',
      content: <Posters />,
    },
    { name: 'Comment', content: <Comments /> },
  ];

  const selectTabHandler = (index) => {
    setCurTab(index);
  };

  return (
    <div>
      <TabMenu>
        {tabArr.map((el, idx) => {
          return (
            <li className={curTab === idx ? 'submenu focused' : 'submenu'} key={idx} onClick={() => selectTabHandler(idx)}>
              <span>{el.name}</span>
            </li>
          );
        })}
      </TabMenu>
      <Content>{tabArr[curTab].content}</Content>
    </div>
  );
}
