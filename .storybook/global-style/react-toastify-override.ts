import { css, keyframes } from 'styled-components';

const TOASTIFY_BOUNCE_OUT = keyframes`
  20% {
    transform: scale3d(0.9, 0.9, 0.9);
  } 50%,
    55% {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  } to {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
`;

const TOASTIFY_BOUNCE_IN = keyframes`
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  } 20% {
    transform: scale3d(1.1, 1.1, 1.1);
  } 40% {
    transform: scale3d(0.9, 0.9, 0.9);
  } 60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  } 80% {
    transform: scale3d(0.97, 0.97, 0.97);
  } to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

export default css`
  .Toastify__animate__bounceIn {
    animation: ${TOASTIFY_BOUNCE_IN} 1s both;
  }

  .Toastify__animate__bounceOut {
    animation: ${TOASTIFY_BOUNCE_OUT} 0.85s both;
  }

  .Toastify__toast-container {
    .Toastify__toast {
      background: #292d3e;

      &-body {
        color: #C3C9E6;
      }

      &-icon > svg {
        fill: #85ADFF;
      }
    }

    .Toastify__close-button {
      color: #fff;
    }

    .Toastify__progress-bar {
      background-color: #85ADFF;
    }
  }
`;