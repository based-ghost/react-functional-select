import { createGlobalStyle } from 'styled-components';
import ReactToastifyOverride from './react-toastify-override';
import { MEDIA_QUERY_IS_MOBILE_XS } from '../../__stories__/helpers';

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

  .prismjs {
    font-size: 14px;
    ${MEDIA_QUERY_IS_MOBILE_XS} {
      font-size: 12px !important;
    }
  }

  code {
    padding: .2em;
    color: #191919;
    font-size: 86.5%;
    border-radius: 3px;
    word-break: break-word;
    background-color: rgba(187, 239, 253, 0.29);
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;

    &.language-jsx,
    &.language-markup,
    &.language-javascript {
      font-weight: 400;
      font-size: 14px !important;
      ${MEDIA_QUERY_IS_MOBILE_XS} {
        font-size: 12px !important;
      }
    }
  }

  ${ReactToastifyOverride}
`;

export default GlobalStyle;