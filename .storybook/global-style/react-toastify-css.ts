import { css, keyframes } from 'styled-components';

const _toastify_trackProgress = keyframes`
  0% {
    transform: scaleX(1);
  } 100% {
    transform: scaleX(0);
  }
`;

const _toastify_bounceOut = keyframes`
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

const _toastify_bounceIn = keyframes`
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

const ReactToastifyCss = css`
  .Toastify__animate__bounceIn {
    animation: ${_toastify_bounceIn} 1s both;
  }

  .Toastify__animate__bounceOut {
    animation: ${_toastify_bounceOut} 0.75s both;
  }

  .Toastify__toast-container {
    z-index: 9999;
    position: fixed;
    padding: 4px;
    width: 320px;
    box-sizing: border-box;
    color: #fff;

    &--top-right {
      top: 1em;
      right: 1em;
    }

    @media only screen and (max-width: 480px) {
      width: 100vw;
      padding: 0;
      left: 0;
      margin: 0;

      &--top-right {
        top: 0;
      }
    }

    .Toastify__toast {
      position: relative;
      min-height: 64px;
      box-sizing: border-box;
      margin-bottom: 1rem;
      padding: 8px;
      border-radius: 4px;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
      display: flex;
      justify-content: space-between;
      max-height: 800px;
      overflow: hidden;
      font-size: 1.075rem;
      font-weight: 400;
      font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
      cursor: pointer;
      direction: ltr;

      &--default {
        background: #fff;
        color: #aaa;
      }

      &--info {
        color: #fff;
        background: #20232a;
      }

      &-body {
        flex: 1;
        margin: auto 0 auto 0.75rem;
      }

      @media only screen and (max-width: 480px) {
        font-size: 1rem;
        border-radius: 0;
        margin-bottom: 0.25rem;
      }
    }

    .Toastify__close-button {
      color: #fff;
      background: transparent;
      outline: none;
      border: none;
      padding: 0;
      cursor: pointer;
      opacity: 0.7;
      transition: 0.3s ease;
      align-self: flex-start;

      &--default {
        color: #000;
        opacity: 0.3;
      }

      & > svg {
        fill: currentColor;
        height: 16px;
        width: 14px;
        font-weight: 700;
      }

      &:hover,
      &:focus {
        opacity: 1;
      }
    }

    .Toastify__progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 5px;
      z-index: 9999;
      opacity: 0.7;
      background-color: rgba(107, 244, 255, 0.7);
      transform-origin: left;

      &--animated {
        animation: ${_toastify_trackProgress} linear 1 forwards;
      }

      &--controlled {
        transition: transform 0.2s;
      }

      &--default {
        background: linear-gradient(
          to right,
          #4cd964,
          #5ac8fa,
          #007aff,
          #34aadc,
          #5856d6,
          #ff2d55
        );
      }
    }
  }
`;

export default ReactToastifyCss;