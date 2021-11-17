import React from 'react';
export default function Posters({ posters }) {
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
