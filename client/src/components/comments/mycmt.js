import React from 'react';

export default function MyCmtBox({ writeHandler }) {
  const clickBtn = (e) => {
    const text = e.target.value;
    writeHandler(text);
  };

  return (
    <>
      <div>
        <span>My Comment</span>
        <button value="modify" onClick={clickBtn}>
          수정
        </button>
        <button value="delete" onClick={clickBtn}>
          삭제
        </button>
      </div>
    </>
  );
}
