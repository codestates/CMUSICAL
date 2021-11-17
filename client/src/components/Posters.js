import React from 'react';
export default function Posters({ poster }) {
  // TODO: Tab으로부터 받은 받은 상세 이미지 렌더링 -> 상세 이미지가 없을 경우도 예외 처리 해야함
  return (
    <>
      <div>상세 이미지</div>
      {Array.isArray(poster)
        ? poster.map((el, index) => {
            return <img src={el.poster} key={index} width="800px"></img>;
          })
        : ''}
    </>
  );
}
