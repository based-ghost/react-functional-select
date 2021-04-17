import { createGlobalStyle } from 'styled-components';
import ReactToastifyCss from './react-toastify-css';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    line-height: 1.15;
    text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    flex: 1;
    margin: 0;
    display: flex;
    color: #262626;
    font-size: 1rem;
    font-weight: 400;
    text-align: left;
    line-height: 1.5;
    min-height: 120vh;
    flex-direction: column;
    background-color: #fff;
    padding: 1rem 0.25rem !important;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  }

  em {
    color: #191919;
    font-weight: 600;
  }

  strong {
    color: #191919;
    font-weight: 600;
    font-size: 1.025em;
  }

  code {
    color: #191919;
    font-size: 88%;
    border-radius: 3px;
    word-break: break-word;
    padding: .15em .2em .15em;
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
    background-color: rgba(187, 239, 253, 0.32);
    font-family: SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
  }

  ${ReactToastifyCss}
`;

export default GlobalStyle;