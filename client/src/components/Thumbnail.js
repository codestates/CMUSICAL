import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Box = styled.div`
  width: 300px;
  min-height: 400px;
  border: 3px solid;
  margin: 20px;

  > .thumbnail {
    width: auto;
    min-height: 400px;
    border: 1px solid red;
    position: relative;

    > .pick {
      width: 30px;
      min-height: 30px;
      border: 3px solid blue;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;

      &:hover {
        background: #339af0;
      }
    }
  }
`;

export default function Thumbnail({ thumbnail, title, id }) {
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

  return (
    <Box>
      <div className="thumbnail">
        <Link to={`/musicalinfo/${id}`}>
          <img src={thumbnail} alt={title} width="300" height="400" />
        </Link>
        <div className="pick" onClick={addFavorites}>
          찜꽁
        </div>
      </div>
    </Box>
  );
}
