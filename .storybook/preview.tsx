import React, { Fragment } from 'react';
import { GlobalStyle } from './global-style';
import type { DecoratorFn } from '@storybook/react';

// import react-toastify CSS files (overrides in react-toastify-override.ts)
import 'react-toastify/dist/ReactToastify.css';

const withGlobalStyle: DecoratorFn = (Story) => (
  <Fragment>
    <GlobalStyle />
    <Story />
  </Fragment>
);

export const decorators = [withGlobalStyle];