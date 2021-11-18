import styled from 'styled-components';

export const UserInfoBody = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h2`
  border: none;
  align-items: flex-start;
  height: 15vh;
`;

export const InputContainer = styled.div`
  margin: 30px;
  padding: auto;
`;

export const Input = styled.input`
  ${(props) =>
    props.type === 'text' &&
    `
        width: 100%;
        min-height: 33px;
        outline: none;
        border-top-style: none;
        border-right-style: none;
        border-left-style: none;
        border-bottom-style: 2px solid #bfa5a3;
        font-size: 18px;
    `}
`;

export const PasswordInput = styled.input`
  ${(props) =>
    props.type === 'password' &&
    `
        width: 100%;
        min-height: 33px;
        outline: none;
        border-top-style: none;
        border-right-style: none;
        border-left-style: none;
        border-bottom-style: 2px solid #bfa5a3;
        font-size: 18px;
    `}
`;

export const ErrorMsg = styled.div`
  color: #bfa5a3;
  margin: 10px 0px;
`;
