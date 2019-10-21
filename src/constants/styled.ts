import { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
`;

export const bounceAnimationCss = css`
  animation: ${bounce} 1.19s ease-in-out infinite;
`;

export const fadeInAnimationCss = css`
  animation: ${fadeIn} 0.225s ease-in-out forwards;
`;

export const mediaQueryIsIE = '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)';