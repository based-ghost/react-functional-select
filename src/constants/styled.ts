import { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

export const FADE_IN_ANIMATION_CSS = css`
  animation: ${fadeIn} 0.225s ease-in-out forwards;
`;