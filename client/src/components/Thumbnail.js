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

export default function Thumbnail({ thumbnail, title, id, favoritesHandler }) {
  const addFavorites = () => {
    if (window.sessionStorage.getItem('loggedInfo') === 'true') {
      // TODO: sessionStorage 대신 cookie에 token이 존재하는지 확인하기
      favoritesHandler(id);
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

// 로그인한 유저만 즐겨찾기 가능
