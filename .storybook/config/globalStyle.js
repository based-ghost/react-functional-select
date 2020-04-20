import reactToastifyCss from './reactToastifyCss';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
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
    flex-direction: column;
    background-color: #fff;
    letter-spacing: 0.00938em;
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
    line-height: 1.4;
    font-size: 0.96em;
    border-radius: 2px;
    word-break: break-word;
    color: rgba(0, 0, 0, 0.87);
    padding: .15em .2em .05em;
    background-color: rgba(255,229,100,0.2);
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;

    @media only screen and (max-width: 525px) {
      padding: .1em .25em .1em;
    }
  }

  ${reactToastifyCss}
`;