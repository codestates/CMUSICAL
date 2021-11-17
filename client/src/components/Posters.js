import React from 'react';
export default function Posters({ posters }) {
  // TODO: Tab으로부터 받은 받은 상세 이미지 렌더링 -> 상세 이미지가 없을 경우도 예외 처리 해야함
  console.log(posters);
  return (
    <>
      <div>상세 이미지</div>
      <div>
        {posters.length !== 0
          ? posters.map((el, index) => {
              return <img src={el} key={index} width="800px" alt={index}></img>;
            })
          : '이미지가 없습니다!'}
      </div>
    </>
  );
}
