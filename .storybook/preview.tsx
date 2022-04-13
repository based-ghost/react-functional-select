import { Fragment } from 'react';
import { GlobalStyle } from './global-style';

const withGlobalStyle = (Story) => (
  <Fragment>
    <GlobalStyle />
    <Story />
  </Fragment>
);

export const decorators = [withGlobalStyle];