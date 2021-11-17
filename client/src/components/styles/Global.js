import { createGlobalStyle } from 'styled-components';

//! 전역으로 css 관리하고싶을 때 여기에 쓰세용!

const GlobalStyles = createGlobalStyle`
// 브라우저의 기본 CSS 스타일(user agent stylesheet) 제거
  * {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }

  h2 {
    font-size: 2rem;
    text-align: center;
  }

  h3 {
    font-size: 1.4rem;
  }  
`;

export default GlobalStyles;
