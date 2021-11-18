import styled from 'styled-components';

export const MyComment = styled.div`
  width: 100%;
  height: 150px;
  margin: 0 1rem 1rem 0;
  word-break: break-all;

  input {
    width: 100%;
    height: 100px;
    border: 1px solid;
    border-radius: 7px;
    font-size: 1.3rem;
    cursor: pointer;
  }

  textarea {
    width: 100%;
    height: 100px;
    border: 1px solid;
    border-radius: 7px;
    font-size: 1.3rem;
    resize: none;
    cursor: pointer;
    outline: none;
    padding: 0.2rem 0.2rem 0 0.2rem;
  }

  button {
    margin: 0 0.2rem 0 0.2rem;
  }
`;
