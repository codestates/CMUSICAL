import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const WriteBox = ({ writeHandler }) => {
  const [myCmt, setMyCmt] = useState('');

  const submitCmt = (e) => {
    setMyCmt(e.target.value);
  };

  const clickBtn = () => {
    writeHandler(myCmt);
  };

  return (
    <>
      <div>
        <input type="text" onChange={submitCmt} />
        <button onClick={clickBtn}>입력</button>
      </div>
    </>
  );
};

export const MyCmtBox = ({ myCmt, deleteHandler, id }) => {
  const modifyCmt = () => {};

  const deleteCmt = () => {
    //  https://localhost:4000/comment
    axios.delete(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`);
    deleteHandler();
  };

  return (
    <>
      <div>
        {myCmt}
        <span>수정</span>
        <span onClick={deleteCmt}>삭제</span>
      </div>
    </>
  );
};

export default function Comments({ id }) {
  const [comment, setComment] = useState([]);
  const [writeCmt, setWriteCmt] = useState(false);

  const writeHandler = (text) => {
    // 작성 요청 보내기
    axios.post(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`, { comment: text }).then((data) => console.log(data));
  };

  const deleteHandler = () => {
    setWriteCmt(false);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`).then((data) => {
      // console.log(data.data.data); // {myCOmment, outhersCommnets}
      const comments = data.data.data;
      if (!comments.myComment) {
        setWriteCmt(false);
      } else {
        setWriteCmt(true);
      }
      setComment(comments);
    });
  }, []);

  return (
    <div>
      {writeCmt ? <MyCmtBox deleteHandler={deleteHandler} myCmt={comment.myComment.comment} id={id} /> : <WriteBox writeHandler={writeHandler} />}
      {/* {console.log(comment)} */}
      {comment.othersComments.map((el) => {
        return <div>{el.comment}</div>;
      })}
    </div>
  );
}

// TODO: 한줄평 가져오기(다른 사람꺼)
// TODO: 한줄평 썼는지 안썼는지 확인해줄 상태 만들기
// TODO: 한줄평 작성했으면 보이는 부분 구현하기
// TODO: 한줄평 작성 안했으면 보이는 부분 구현하기
// TODO: 한줄평 작성했으면 수정 / 삭제 요청 날릴 수 있게 구현하기
