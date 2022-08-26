import { createGlobalStyle } from 'styled-components';
import ReactToastifyOverride from './react-toastify-override';

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
    padding: 1rem 0 !important;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  }

  em {
    font-weight: 600;
  }

  strong {
    font-weight: 600;
    font-size: 1.025em;
  }

  code {
    font-size: 90%;
    color: #353535;
    line-height: 1.7;
    border-radius: 4px;
    padding: .15em .475em;
    word-break: break-word;
    background-color: rgba(187, 239, 253, 0.29);
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  }

  ${ReactToastifyOverride}
`;

export default GlobalStyle;