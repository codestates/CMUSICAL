import React, { useState } from 'react';
import MyCmtBox from './comments/mycmt';
import OthersCmtsBox from './comments/otherscmt';
import WriteCmtBox from './comments/writecmt';
import { MyComment } from '../components/styles/MyComment.styled';
import styled from 'styled-components';
import dotenv from 'dotenv';
dotenv.config();

export const Container = styled.div`
  padding: 5rem 7rem 3rem 7rem;
`;

export const Top = styled.div`
  display: flex;
  flex-wrap: wrap;

  .title {
    width: 100%;
    margin: 0.9rem 0;
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #1c1c1c;
  }

  .cmt {
    width: 100%;
  }
`;

export const Bottom = styled.div``;

export default function Comments({ cmtList, setCmtList, id, isLogin }) {
  const [myCmtStatus, setMyCmtStatus] = useState(true);

  const handleMyCmtStatus = () => {
    setMyCmtStatus(!myCmtStatus);
  };

  return (
    <>
      <Container>
        <Top>
          <div className="title">나의 한줄평</div>
          <div className="cmt">
            {isLogin ? (
              myCmtStatus ? (
                <MyCmtBox cmtList={cmtList} handleMyCmtStatus={handleMyCmtStatus} isLogin={isLogin} /> //
              ) : (
                <WriteCmtBox cmtList={cmtList} setCmtList={setCmtList} handleMyCmtStatus={handleMyCmtStatus} id={id} />
              )
            ) : (
              <MyComment>
                <input type="text" placeholder="로그인하고 이용해보세요! :)" />
              </MyComment>
            )}
          </div>
        </Top>
        <Bottom>
          <OthersCmtsBox cmtList={cmtList} setCmtList={setCmtList} id={id} />
        </Bottom>
      </Container>
    </>
  );
}
