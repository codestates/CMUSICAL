import React, { useState } from 'react';
import axios from 'axios';

export default function WriteCmtBox({ cmtList, setCmtList, handleMyCmtStatus, id }) {
  // cmtList.myComment ? cmtList.myComment[0].comment : ''
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
      <div>
        <input type="text" onKeyUp={handleKeyUp} value={cmt} onChange={inputCmt} />
        <button value="add" onClick={handleCommentSubmit}>
          입력
        </button>
        <button value="undo" onClick={handleCommentDelete}>
          삭제
        </button>
        <button value="undo" onKeyUp={handleKeyUp} onClick={handleMyCmtStatus}>
          취소
        </button>
      </div>
    </>
  );
}
