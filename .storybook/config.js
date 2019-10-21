import React from 'react';
import ReactDOM from 'react-dom';
import DarkTheme from './darkTheme';
import GlobalStyle from "./globalStyle";
import { configure, addParameters } from '@storybook/react';

// Define storybook global configuration
const _globalStyleId = "gen3-global-style";
const req = require.context("../src/__stories__", true, /\.story\.tsx$/);

addParameters({
  options: {
    theme: DarkTheme,
    storySort: (a, b) => {
      return (a[1].kind === b[1].kind) ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true });
    },
  }
});

// In loadStories mount the GlobalStyle component once (styled-component createGlobalStyle function)
// ...instead of the alternative which is to add it as a decorator - this causes mount/unmount with every story navigation
const loadStories = () => {
  const setupGlobalStyle = () => {
    const globalStyleEl = document.getElementById(_globalStyleId) || (() => {
      const el = document.createElement('div');
      el.id = _globalStyleId;
      document.head.append(el);
      return el;
    })();

    return {
      globalStyleEl,
      cleanup: () => {
        globalStyleEl && document.head.removeChild(globalStyleEl);
      }
    };
  };
  
  // Mount GlobalStyle & cleanup temp node created after mounting
  const { globalStyleEl, cleanup } = setupGlobalStyle();
  ReactDOM.render(<GlobalStyle />, globalStyleEl, cleanup);

  // Automatically import all files ending in *.story.tsx found at path '../src/__stories__'
  req.keys().forEach(file => req(file));
};

configure(loadStories, module);