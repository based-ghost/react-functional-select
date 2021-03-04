import ReactDOM from 'react-dom';
import { GlobalStyle } from './global-style';

// Configure createGlobalStyle for styled-components
const _gsNodeId = 'temp2-global-style';

const _gsNode =
  document.getElementById(_gsNodeId) ||
  (() => {
    const el = document.createElement('div');
    el.id = _gsNodeId;
    document.head.appendChild(el);
    return el;
  })();

// Callback to remove node used to mount GlobalStyle to
const rendererCallbackFn = () => {
  _gsNode && document.head.removeChild(_gsNode);
};

// Mount GlobalStyle to gsNode and then execute callback rendererCallbackFn()
ReactDOM.render(<GlobalStyle />, _gsNode, rendererCallbackFn);