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

export const BOUNCE_ANIMATION_CSS = css`${_bounceKeyframes} 1.19s ease-in-out infinite`;
export const FADE_IN_ANIMATION_CSS = css`${_fadeInKeyframes} 0.225s ease-in-out forwards`;

export const SINGLE_VALUE_BASE_STYLE = css`
  top: 50%;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  box-sizing: border-box;
  text-overflow: ellipsis;
  transform: translateY(-50%);
`;