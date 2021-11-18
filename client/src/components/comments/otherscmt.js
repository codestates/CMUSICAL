import React from 'react';
import { CmtBox } from '../styles/CmtBox.styled';
import axios from 'axios';

export default function OthersCmtsBox({ cmtList, setCmtList, id }) {
  const handleLikesClick = (e) => {
    const commentId = e.target.attributes.commentId.value;
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDR}/likes?commentId=${commentId}`) //
      .then((data) => {
        async function getCmtList() {
          setCmtList((await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`)).data.data);
        }
        getCmtList();
      })
      .catch((err) => {
        // TODO Refactoring: 좋아요 눌러져 있을 경우 분기하는 조건문
        axios
          .delete(`${process.env.REACT_APP_SERVER_ADDR}/likes?commentId=${commentId}`) //
          .then((data) => {
            async function getCmtList() {
              setCmtList((await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`)).data.data);
            }
            getCmtList();
          })
          .catch((err) => console.log);
      });
    // }
  };

  return (
    <>
      <div>
        {cmtList.othersComments.length !== 0 ? (
          cmtList.othersComments.map((el, idx) => {
            return (
              <CmtBox key={idx}>
                <div className="nickname">{el.nickname}</div>
                <div className="comment">{el.comment}</div>
                <div className="cmtBottom">
                  <div className="like" onClick={handleLikesClick} commentId={el.id}>
                    ❤️ {el.likes}
                  </div>
                  <div className="date">{el.createdAt.slice(0, 10)}</div>
                </div>
              </CmtBox>
            );
          })
        ) : (
          <CmtBox none>작성된 한줄평이 없습니다.</CmtBox>
        )}
      </div>
    </>
  );
}
