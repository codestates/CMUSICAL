import React from 'react';
import Posters from '../components/Posters';
import Comments from '../components/Comments';
export default function Tab({ images }) {
  return (
    <div>
      <div>tap1</div>
      <div>tap2</div>
      {!images ? '로딩 이미지' : <Posters images={images.styurl} />}

      <Comments />
    </div>
  );
}
