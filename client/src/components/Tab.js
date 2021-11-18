import React, { useState, useEffect } from 'react';
import Posters from '../components/Posters';
import Comments from './Comments';
import styled from 'styled-components';
import axios from 'axios';

export const Container = styled.div`
  border: 3px solid #574240;
  border-radius: 20px;
  margin: 0 0 4rem 0;
  text-align: center;
`;

const TabMenu = styled.ul`
  display: flex;
  width: 100%;
  min-height: 50px;
  justify-content: space-evenly;
  background-color: #574240;
  border-radius: 13px;
  align-items: center;
  font-weight: bold;
  list-style: none;
  color: white;
  font-size: 1.9rem;

  .submenu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    padding: 10px 0;
    min-height: 3rem;
    text-align: center;
    background-color: #574240;
    border-radius: 10px;
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

export default function Tab({ poster, id, isLogin }) {
  const [curTab, setCurTab] = useState(0);
  const [cmtList, setCmtList] = useState();

  let posters = [];
  // poster = null 또는 값 존재(값 = string 또는 array)
  if (poster) {
    if (poster.styurl === 'string') posters = [poster.styrul];
    else posters = posters.concat(poster.styurl);
  }

  // TODO: MusicalInfo로부터 받아온 props(images)를 Posters 컴포넌트에 넘겨주기
  const tabArr = [
    {
      name: 'Posters',
      content: <Posters posters={posters} />,
    },
    { name: 'Comment', content: <Comments cmtList={cmtList} setCmtList={setCmtList} id={id} isLogin={isLogin} /> },
  ];

  const selectTabHandler = (index) => {
    setCurTab(index);
  };

  useEffect(() => {
    async function getCmtList() {
      setCmtList((await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`)).data.data);
    }
    getCmtList();
  }, []);

  return (
    <Container>
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
    </Container>
  );
}
