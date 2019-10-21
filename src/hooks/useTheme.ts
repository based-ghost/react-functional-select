import { useEffect, useState } from 'react';
import { mergeThemeStyles } from '../theme';
import { DefaultTheme } from 'styled-components';

/**
 * Custom hook that manages the state for the styled-component ThemeProvider.
 * Takes an object with properties that match that of the defined DefaultTheme in styled.d.ts.
 * The default properties from '../theme' will be overriden if found in themeConfig.
 */
export const useTheme = (themeConfig?: Partial<DefaultTheme>): DefaultTheme => {
  const [theme, setTheme] = useState<DefaultTheme>(() => mergeThemeStyles(themeConfig));

  useEffect(() => {
    const mergedStyles = mergeThemeStyles(themeConfig);
    setTheme(mergedStyles);
  }, [themeConfig]);

  return theme;
};