import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    flex: 1;
    margin: 0;
    display: flex;
    color: #212529;
    font-size: 1rem;
    font-weight: 400;
    text-align: left;
    line-height: 1.5;
    min-height: 120vh;
    flex-direction: column;
    background-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  em {
    font-weight: 600;
  }
`;