import React from 'react';
export default function Posters({ images }) {
  return (
    <div>
      {images.map((el, idx) => {
        return <img src={el} alt={idx} width="300" height="400" />;
      })}
    </div>
  );
}
