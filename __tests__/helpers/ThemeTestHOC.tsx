import { DEFAULT_THEME } from '../../src/theme';
import { ThemeProvider } from 'styled-components';

const ThemeTestHOC = ({ children }) => (
  <ThemeProvider theme={DEFAULT_THEME}>
    {children}
  </ThemeProvider>
);

export default ThemeTestHOC;