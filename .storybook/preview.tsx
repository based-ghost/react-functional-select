import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import { GlobalStyle } from './global-style';

// Configure createGlobalStyle for styled-components
const _globalStyleEl: HTMLElement =
  document.getElementById('temp2-global-style') ||
  (() => {
    const el = document.createElement('div');
    el.id = 'temp2-global-style';
    document.head.appendChild(el);
    return el;
  })();

// Callback to configure react-toastify and remove node used to mount GlobalStyle to
const completeSetupDOM = (): void => {
  toast.configure({
    autoClose: 2500,
    draggable: false,
    newestOnTop: true,
    position: 'top-right'
  });

  if (_globalStyleEl) {
    document.head.removeChild(_globalStyleEl);
  }
};

// Mount GlobalStyle to _globalStyleEl and then execute callback completeSetupDOM()
ReactDOM.render(<GlobalStyle />, _globalStyleEl, completeSetupDOM);