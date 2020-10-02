import { createGlobalStyle } from 'styled-components';
import ReactToastifyCss from './react-toastify-css';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    line-height: 1.15;
    text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    flex: 1;
    margin: 0;
    display: flex;
    font-size: 1rem;
    font-weight: 400;
    text-align: left;
    line-height: 1.5;
    min-height: 120vh;
    padding: 1rem 0.25rem !important;
    flex-direction: column;
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  }

  em {
    font-weight: 600;
  }

  strong {
    color: black;
    font-weight: 600;
    font-size: 1.025em;
  }

  code {
    font-size: 88%;
    border-radius: 3px;
    word-break: break-word;
    padding: .15em .2em .15em;
    color: rgba(0, 0, 0, 0.87);
    background-color: rgba(30, 167, 253, 0.135);
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;

    @media only screen and (max-width: 525px) {
      padding: .1em .25em .1em;
    }
  }

  ${ReactToastifyCss}
`;