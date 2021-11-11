import styled from 'styled-components';

export const Box = styled.div`
  width: 300px;
  min-height: 400px;
  border: 3px solid;
  margin: 20px;

  > .thumbnail {
    width: auto;
    min-height: 400px;
    border: 1px solid red;
    position: relative;

    > .pick {
      width: 30px;
      min-height: 30px;
      border: 3px solid blue;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
`;

export const Thumbnail = ({ poster, title }) => {
  return (
    <Box>
      <div className="thumbnail">
        <img src={poster} alt={title} width="300" height="400" />
        <div className="pick">찜꽁</div>
      </div>
    </Box>
  );
};
