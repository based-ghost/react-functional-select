import { css, keyframes } from 'styled-components';

const _bounceKeyframes = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
`;

const _fadeInKeyframes = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

export const FADE_IN_ANIMATION_CSS = css`${_fadeInKeyframes} 0.2s ease-out both`;
export const BOUNCE_ANIMATION_CSS = css`${_bounceKeyframes} 1.19s ease-in-out infinite`;