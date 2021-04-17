import ReactDOM from 'react-dom';
import { GlobalStyle } from './global-style';

// Configure createGlobalStyle for styled-components
const GS_NODE_ID = 'temp2-global-style';

const GS_NODE =
  document.getElementById(GS_NODE_ID) ||
  (() => {
    const el = document.createElement('div');
    el.id = GS_NODE_ID;
    document.head.appendChild(el);
    return el;
  })();

// Callback to remove node used to mount GlobalStyle to
const rendererCallbackFn = () => {
  GS_NODE && document.head.removeChild(GS_NODE);
};

// Mount GlobalStyle to gsNode and then execute callback rendererCallbackFn()
ReactDOM.render(<GlobalStyle />, GS_NODE, rendererCallbackFn);