import React, { useState, useEffect } from 'react';
import MyCmtBox from './comments/mycmt';
import OthersCmtsBox from './comments/otherscmt';
import WriteCmtBox from './comments/writecmt';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default function Comments({ cmtList, setCmtList, id }) {
  const [myCmtStatus, setMyCmtStatus] = useState(false);
  // TODO 로그인 상태 상속받기!
  const isLogin = false;
  // console.log(cmtList);
  useEffect(() => {
    if (isLogin && !!cmtList.myComment) setMyCmtStatus(true);
  }, []);

  const handleMyCmtStatus = () => {
    setMyCmtStatus(!myCmtStatus);
  };

  return (
    <>
      <div>
        {isLogin ? (
          myCmtStatus ? (
            <MyCmtBox cmtList={cmtList} handleMyCmtStatus={handleMyCmtStatus} /> //
          ) : (
            <WriteCmtBox cmtList={cmtList} setCmtList={setCmtList} handleMyCmtStatus={handleMyCmtStatus} id={id} />
          )
        ) : (
          <div>로그인하시오</div>
        )}
        <OthersCmtsBox cmtList={cmtList} setCmtList={setCmtList} id={id} />
      </div>
    </>
  );
}

// 나의 코멘트 <WriteBox /> <---write---> <MyCommentBox />

// 다른 사람 코멘트

// ! ----------------------------------------------------------------
// 로그인을 했다고 가정
// Comments 들어오자마자 GET 요청 날려야함
// myComment가 null이면 <WriteBox /> 보여주고
// myComment가 있다면 <WriteBox /> 대신 <MyCommentBox /> 보여주기
// othersComments가 null 이면 보여줄 댓글 없음
// othersComments가 있다면 map 으로 댓글 보여주기

// <WriteBox />의 입력 버튼 클릭하면 POST 요청 날리고 다시 GET 요청

// <MyCommentBox />의 수정 버튼 클릭하면 <WriteBox />로 전환, <WriteBox />의 입력 버튼 클릭하면 PATCH 요청 날리고 다시 GET 요청
// ? <WriteBox />에서 POST 요청, PATCH 요청 어떻게 구분할까?

// <MyCommentBox />의 삭제 버튼 클릭하면 DELETE 요청 날리고 다시 GET 요청

// setWrite(false)가 되는 경우: GET 요청 후 응답 데이터의 myComment가 null 일 때 / <MyCommentBox />의 수정 버튼 클릭
// setWrite(true)가 되는 경우: <WriteBox />의 입력 버튼 클릭
// ! ----------------------------------------------------------------

// ! ----------------------------------------------------------------
// 로그인 안했다고 가정
// Comments 들어오자마자 GET 요청 날려야함
// 로그인을 안했기 때문에 myComment가 무조건 null -> <WriteBox /> 보여짐
// othersComments가 null 이면 보여줄 댓글 없음
// othersComments가 있다면 map 으로 댓글 보여주기

// <WriteBox />의 입력 버튼 클릭하면 서버에서 로그인하지 않은 유저라고 응답이 오기 때문에 로그인하고 이용하라는 메세지 보여주기
// ! ----------------------------------------------------------------
