import React from 'react';
import { ThemeProvider } from 'styled-components';
import { DEFAULT_THEME } from '../../src/constants';

const ThemeTestHOC = ({ children }) => (
  <ThemeProvider theme={DEFAULT_THEME}>
    {children}
  </ThemeProvider>
);

export default ThemeTestHOC;