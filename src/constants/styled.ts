import { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

export const fadeInAnimationCss = css`
  animation: ${fadeIn} 0.225s ease-in-out forwards;
`;

export const mediaQueryIsIE = '@media all and (-ms-high-contrast: none)';
export const mediaQueryIsEdge = '@supports (-ms-ime-align: auto)';