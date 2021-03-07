import { FunctionComponent } from 'react';
import { DEFAULT_THEME } from '../../src/theme';
import { ThemeProvider } from 'styled-components';

const ThemeTestHOC: FunctionComponent = ({ children }) => (
  <ThemeProvider theme={DEFAULT_THEME}>
    {children}
  </ThemeProvider>
);

export default ThemeTestHOC;