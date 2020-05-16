import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import { addParameters } from '@storybook/react';
import { GlobalStyle, polyfillManager } from './config';

// Polyfill IE/Edge browsers
polyfillManager.polyfill();

// Define storybook global configuration
addParameters({
  options: {
    storySort: (a, b) => {
      return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    },
  },
});

// Configure createGlobalStyle for styled-components
const gsElId = 'temp3-global-style';

const globalStyleEl =
  document.getElementById(gsElId) ||
  (() => {
    const el = document.createElement('div');
    el.id = gsElId;
    document.head.appendChild(el);
    return el;
  })();

// Callback to configure react-toastify and remove node used to mount GlobalStyle to
const completeSetupDOM = () => {
  toast.configure({
    autoClose: 2500,
    draggable: false,
    newestOnTop: true,
    position: 'top-right'
  });

  if (globalStyleEl) {
    document.head.removeChild(globalStyleEl);
  }
};

// Mount GlobalStyle to globalStyleEl and then execute callback completeSetupDOM()
ReactDOM.render(<GlobalStyle />, globalStyleEl, completeSetupDOM);
