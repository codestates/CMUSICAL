import React from 'react';
import styled from 'styled-components';

export const Box = styled.div`
  padding: 0 0 3.5rem 0;
  font-size: 1.4rem;
`;
export const Img = styled.img.attrs({})`
  width: 95%;
  height: 100%;
  outline: none;
  border: none;
`;

export const Container = styled.div`
  padding: 3rem 0 0 0;
`;

export default function Posters({ posters }) {
  return (
    <>
      <Container>
        {posters.length !== 0 ? (
          posters.map((el, index) => {
            return <Img src={el} key={index} width="800px" alt={index}></Img>;
          })
        ) : (
          <Box>이미지가 없습니다!</Box>
        )}
      </Container>
    </>
  );
}
