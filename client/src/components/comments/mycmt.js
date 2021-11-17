import React from 'react';

export default function MyCmtBox({ cmtList, handleMyCmtStatus, isLogin }) {
  const isMyCmt = cmtList.myComment.length !== 0;
  return (
    <>
      {isLogin ? (
        <div onClick={handleMyCmtStatus}>
          <div>My Comment</div>
          <div>
            {isMyCmt ? ( //
              <div>
                <div>comment: {cmtList.myComment[0].comment}</div>
                <div>likes: {cmtList.myComment[0].likes}</div>
                <div>{cmtList.myComment[0].createdAt.slice(0, 10)}</div>
              </div>
            ) : (
              '작성한 한줄평이 없습니다.'
            )}
          </div>
          <div>----------------------------------------------------------------</div>
        </div>
      ) : (
        <div>
          <div>My Comment</div>
          <div>로그인 해주세요.</div>
          <div>----------------------------------------------------------------</div>
        </div>
      )}
    </>
  );
}
