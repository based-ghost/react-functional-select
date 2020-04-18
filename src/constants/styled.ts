import { css, keyframes } from 'styled-components';

const _bounce_keyframes = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
`;

const _fade_in_keyframes = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

export const BOUNCE_ANIMATION_CSS = css`${_bounce_keyframes} 1.19s ease-in-out infinite`;
export const FADE_IN_ANIMATION_CSS = css`${_fade_in_keyframes} 0.225s ease-in-out forwards`;