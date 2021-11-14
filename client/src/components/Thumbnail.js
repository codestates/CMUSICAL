import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdBookmarkAdd } from 'react-icons/md';
import { MdOutlineBookmarkAdd } from 'react-icons/md';

export const Box = styled.div`
  width: 300px;
  min-height: auto;
  border: 3px solid;

  > .thumbnail {
    width: auto;
    position: relative;

    > .pick {
      width: 50px;
      min-height: 50px;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
`;

export default function Thumbnail({ thumbnail, title, id }) {
  const [icon, setIcon] = useState(false);
  // TODO: 즐겨찾기 목록 상태 만들기

  const addFavorites = () => {
    // TODO: sessionStorage 대신 cookie에 token이 존재하는지 확인하기
    if (window.sessionStorage.getItem('loggedInfo') === 'true') {
      // TODO: GET요청으로 데이터를 받아서 상태에 저장
      // TODO: 상태 돌면서 id(props)와 같은게 있다면 DELETE 요청
      // TODO: 상태 돌면서 id(props)와 같은게 없다면 POST 요청
    } else {
      // TODO: 모달이든 이펙트든 로그인하고 이용하라고 보여주기
      console.log('로그인하고 이용하세요!');
    }
  };

  const onIcon = () => {
    setIcon(true);
  };

  const offIcon = () => {
    setIcon(false);
  };

  return (
    <Box>
      <div className="thumbnail">
        <Link to={`/musicalinfo/${id}`}>
          <img src={thumbnail} alt={title} width="300" height="400" />
        </Link>
        <div className="pick" onClick={addFavorites}>
          {icon ? <MdBookmarkAdd size="3.5rem" color="yellow" onMouseLeave={offIcon} /> : <MdOutlineBookmarkAdd size="3.5rem" color="yellow" onMouseOver={onIcon} />}
        </div>
      </div>
    </Box>
  );
}
