import styled from 'styled-components';

export const CmtBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-bottom: ${({ none }) => (none ? '' : '2px solid #574240')};
  text-align: ${({ none }) => (none ? 'center' : 'left')};
  padding: ${({ none }) => (none ? '2rem' : '0 0 0.6rem 0')};
  font-size: ${({ none }) => (none ? '1.4rem' : '')};

  .nickname {
    font-weight: bold;
    font-size: 1.4rem;
    margin: 2rem 0 0.5rem 0;
    color: #bfa5a3;
  }

  .comment {
    word-break: break-all;
    margin: 0 0 0.6rem 0;
    font-size: 1rem;
    cursor: ${({ myCmt }) => (myCmt ? 'pointer' : '')};
  }

  .cmtBottom {
    display: flex;
    justify-content: space-between;
  }

  .date {
    font-size: 0.8rem;
  }

  .like {
    font-size: 1rem;
    cursor: pointer;
  }
`;
