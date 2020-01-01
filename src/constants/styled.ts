import { css, keyframes } from 'styled-components';

const FADE_IN_KEYFRAMES = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

const FADE_IN_ANIMATION_CSS = css`
  animation: ${FADE_IN_KEYFRAMES} 0.225s ease-in-out forwards;
`;

export {
  FADE_IN_ANIMATION_CSS
};