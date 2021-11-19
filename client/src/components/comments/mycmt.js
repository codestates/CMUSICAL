import React from 'react';
import { MyComment } from '../styles/MyComment.styled';
import { CmtBox } from '../styles/CmtBox.styled';
import styled from 'styled-components';

export const Container = styled.div``;

export default function MyCmtBox({ cmtList, handleMyCmtStatus, isLogin }) {
  const isMyCmt = cmtList.myComment.length !== 0;
  return (
    <>
      <Container>
        <div onClick={handleMyCmtStatus}>
          {isMyCmt ? ( //
            <CmtBox myCmt>
              <div className="comment">{cmtList.myComment[0].comment}</div>
              <div className="cmtBottom">
                <div className="like">❤️ {cmtList.myComment[0].likes}</div>
                <div className="date">{cmtList.myComment[0].createdAt.slice(0, 10)}</div>
              </div>
            </CmtBox>
          ) : (
            <MyComment isLogin>
              <input type="text" placeholder=" 한줄평을 남겨보세요! :)" />
            </MyComment>
          )}
        </div>
      </Container>
    </>
  );
}
