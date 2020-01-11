import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './config';
import { addParameters } from '@storybook/react';
import { toast, ToastPosition } from 'react-toastify';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

// polyfill EventSource for Edge and IE browsers
global.EventSource = NativeEventSource || EventSourcePolyfill;

// Define storybook global configuration
addParameters({
  options: {
    storySort: (a, b) => {
      return (a[1].kind === b[1].kind) ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    },
  },
});

// Configure react-toastify
toast.configure({
  autoClose: 2500,
  draggable: false,
  newestOnTop: true,
  position: ToastPosition.TOP_RIGHT,
});

// Configure createGlobalStyle for styled-components
const globalStyleEl =
  document.getElementById('temp3-global-style') ||
  (() => {
    const el = document.createElement('div');
    el.id = 'temp3-global-style';
    document.head.append(el);
    return el;
  })();

const removeGlobalStyleEl = () => {
  if (globalStyleEl) {
    document.head.removeChild(globalStyleEl);
  }
};

ReactDOM.render(
  <GlobalStyle />,
  globalStyleEl,
  removeGlobalStyleEl
);
