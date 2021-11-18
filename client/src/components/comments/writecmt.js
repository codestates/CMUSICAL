import React, { useState } from 'react';
import { MyComment } from '../styles/MyComment.styled';
import { Button } from '../styles/Button.styled';
import axios from 'axios';

export default function WriteCmtBox({ cmtList, setCmtList, handleMyCmtStatus, id }) {
  const [cmt, setCmt] = useState(cmtList.myComment.length !== 0 ? cmtList.myComment[0].comment : '');

  const inputCmt = (e) => {
    setCmt(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
    if (e.key === 'Escape') {
      handleMyCmtStatus();
    }
  };

  const handleCommentSubmit = (e) => {
    if (cmtList.myComment.length === 0) {
      if (cmt.length === 0) return;
      axios
        .post(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`, { comment: cmt }) //
        .then((data) => {
          async function getCmtList() {
            setCmtList((await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`)).data.data);
          }
          getCmtList();
        })
        .then(handleMyCmtStatus())
        .catch((err) => console.log);
    } else {
      axios
        .patch(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`, { comment: cmt })
        .then((data) => {
          async function getCmtList() {
            setCmtList((await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`)).data.data);
          }
          getCmtList();
        })
        .then(handleMyCmtStatus())
        .catch((err) => console.log);
    }
  };

  const handleCommentDelete = (e) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`)
      .then((data) => {
        async function getCmtList() {
          setCmtList((await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`)).data.data);
        }
        getCmtList();
      })
      .then(handleMyCmtStatus())
      .catch((err) => console.log);
  };

  // const handleCommentCancle = e => {};
  return (
    <>
      <MyComment>
        <textarea type="text" onKeyUp={handleKeyUp} value={cmt} onChange={inputCmt} />
        <Button value="add" onClick={handleCommentSubmit}>
          입력
        </Button>
        <Button value="undo" onClick={handleCommentDelete}>
          삭제
        </Button>
        <Button value="undo" onKeyUp={handleKeyUp} onClick={handleMyCmtStatus}>
          취소
        </Button>
      </MyComment>
    </>
  );
}
