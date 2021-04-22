import ReactDOM from 'react-dom';
import { GlobalStyle } from './global-style';

// Configure createGlobalStyle for styled-components
const gsNodeId = 'temp2-global-style';

const gsNode =
  document.getElementById(gsNodeId) ||
  (() => {
    const el = document.createElement('div');
    el.id = gsNodeId;
    document.head.appendChild(el);
    return el;
  })();

// Callback to remove node used to mount GlobalStyle to
const rendererCallbackFn = () => {
  gsNode && document.head.removeChild(gsNode);
};

// Mount GlobalStyle to gsNode and then execute callback rendererCallbackFn()
ReactDOM.render(<GlobalStyle />, gsNode, rendererCallbackFn);