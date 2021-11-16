import React from 'react';

export default function MyCmtBox({ cmtList, handleMyCmtStatus }) {
  const isMyCmt = Array.isArray(cmtList.myComment);
  console.log(isMyCmt);
  return (
    <>
      <div onClick={handleMyCmtStatus}>
        <div>My Comment</div>
        <div>
          {isMyCmt ? ( //
            <div>
              <div>comment: {cmtList.myComment[0].comment}</div>
              <div>likes: {cmtList.myComment[0].likes}</div>
            </div>
          ) : (
            '작성한 한줄평이 없습니다.'
          )}
        </div>
        <div>----------------------------------------------------------------</div>
      </div>
    </>
  );
}
