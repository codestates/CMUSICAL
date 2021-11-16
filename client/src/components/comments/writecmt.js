import React, { useState } from 'react';

export default function WriteCmtBox({ writeHandler }) {
  const [cmt, setCmt] = useState('');

  const inputCmt = (e) => {
    setCmt(e.target.value);
  };

  const clickBtn = (e) => {
    const text = e.target.value;
    writeHandler(text, cmt);
  };

  return (
    <>
      <div>
        <input type="text" onChange={inputCmt} />
        <button value="add" onClick={clickBtn}>
          입력
        </button>
        <button value="undo" onClick={clickBtn}>
          취소
        </button>
      </div>
    </>
  );
}
