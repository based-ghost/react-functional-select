import { css, keyframes } from 'styled-components';

const BOUNCE_KEYFRAMES = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
`;

const FADE_IN_KEYFRAMES = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

export const FADE_IN_ANIMATION_CSS = css`${FADE_IN_KEYFRAMES} 0.25s ease-in-out`;
export const BOUNCE_ANIMATION_CSS = css`${BOUNCE_KEYFRAMES} 1.19s ease-in-out infinite`;