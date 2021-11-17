import React from 'react';
import axios from 'axios';

export default function OthersCmtsBox({ cmtList, setCmtList, id }) {
  const handleLikesClick = e => {
    const commentId = e.target.attributes.commentId.value;
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDR}/likes?commentId=${commentId}`) //
      .then(data => {
        async function getCmtList() {
          setCmtList((await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`)).data.data);
        }
        getCmtList();
      })
      .catch(err => {
        // TODO Refactoring: 좋아요 눌러져 있을 경우 분기하는 조건문
        axios
          .delete(`${process.env.REACT_APP_SERVER_ADDR}/likes?commentId=${commentId}`) //
          .then(data => {
            async function getCmtList() {
              setCmtList((await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/comment?itemId=${id}`)).data.data);
            }
            getCmtList();
          })
          .catch(err => console.log);
      });
    // }
  };

  return (
    <>
      <div>
        {cmtList.othersComments.length !== 0
          ? cmtList.othersComments.map((el, idx) => {
              return (
                <div key={idx}>
                  <div>{el.comment}</div>
                  <div>{el.nickname}</div>
                  <div onClick={handleLikesClick} commentId={el.id}>
                    {el.likes}
                  </div>
                  <div>{el.createdAt.slice(0, 10)}</div>
                  <div>----------------------------------------------------------------</div>
                </div>
              );
            })
          : '작성된 한줄평이 없습니다.'}
      </div>
    </>
  );
}
