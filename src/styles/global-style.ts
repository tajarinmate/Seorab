import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }

  html, body { 
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    @font-face {
    font-family: 'GangwonEdu_OTFBoldA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff') format('woff');
    font-weight: normal, bold, bolder;
    font-style: normal;
  }
    font-size : 16px;
    color: rgb(58, 58, 58);
  }

  ul, ol {
    list-style: none;
  } 

  button, input {
    all: unset;
    cursor: pointer;
  }

  /* 숨김 콘텐츠 */
  .a11y-hidden
  {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: polygon(0 0, 0 0, 0 0);
  }

  
`;
