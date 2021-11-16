import React, { useState, useEffect } from 'react';
import Posters from '../components/Posters';
import Comments from './comments';
import styled from 'styled-components';
import axios from 'axios';

const TabMenu = styled.ul`
  display: flex;
  width: 100%;
  min-height: 50px;
  justify-content: space-evenly;
  background-color: black;
  align-items: center;
  font-weight: bold;
  list-style: none;
  color: white;
  font-size: 1.5rem;

  .submenu {
    width: 250px;
    min-height: 3rem;
    text-align: center;
    background-color: black;
    padding-top: 20px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }

  .focused {
    color: black;
    background-color: white;
  }
`;

const Content = styled.div`
  width: 100%;
  min-height: auto;
`;

export default function Tab({ posters, id }) {
  const [curTab, setCurTab] = useState(0);
  const [cmtList, setCmtList] = useState();

  // TODO: MusicalInfo로부터 받아온 props(images)를 Posters 컴포넌트에 넘겨주기
  const tabArr = [
    {
      name: 'Posters',
      content: <Posters />,
    },
    { name: 'Comment', content: <Comments id={id} cmtList={cmtList} /> },
  ];

  const selectTabHandler = index => {
    setCurTab(index);
  };

  const getCmtList = async () => {
    setCmtList((await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`)).data.data);
  };

  useEffect(() => {
    getCmtList();
    console.log(posters);
  }, []);

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
