import React from 'react';

export default function OthersCmtsBox({ cmtList }) {
  return (
    <>
      <div>
        {cmtList
          ? cmtList.othersComments.map((el, idx) => {
              return (
                <div key={idx}>
                  <span>{el.comment}</span>
                  <span>{el.nickname}</span>
                  <span>{el.createdAt.slice(0, 10)}</span>
                </div>
              );
            })
          : '로딩 이미지'}
      </div>
    </>
  );
}
