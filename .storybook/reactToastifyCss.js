import { css, keyframes } from 'styled-components';

const Toastify__trackProgress = keyframes`
  0% {
    transform: scaleX(1);
  } 100% {
    transform: scaleX(0);
  }
`;

const Toastify__bounceOutRight = keyframes`
  20% {
    opacity: 1;
    transform: translate3d(-20px, 0, 0);
  } to {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }
`;

const Toastify__bounceInRight = keyframes`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  } from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  } 60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  } 75% {
    transform: translate3d(10px, 0, 0);
  } 90% {
    transform: translate3d(-5px, 0, 0);
  } to {
    transform: none;
  }
`;

const reactToastifyCss = css`
  .Toastify__toast-container {
    z-index: 9999;
    transform: translate3d(0, 0, 9999px);
    position: fixed;
    padding: 4px;
    width: 320px;
    box-sizing: border-box;
    color: #fff;
    &--top-left {
      top: 1em;
      left: 1em;
    }
    &--top-center {
      top: 1em;
      left: 50%;
      margin-left: -(320px / 2);
    }
    &--top-right {
      top: 1em;
      right: 1em;
    }
    &--bottom-left {
      bottom: 1em;
      left: 1em;
    }
    &--bottom-center {
      bottom: 1em;
      left: 50%;
      margin-left: -(320px / 2);
    }
    &--bottom-right {
      bottom: 1em;
      right: 1em;
    }

    @media only screen and (max-width: 480px) {
      width: 100vw;
      padding: 0;
      left: 0;
      margin: 0;
      &--top-left,
      &--top-center,
      &--top-right {
        top: 0;
      }
      &--bottom-left,
      &--bottom-center,
      &--bottom-right {
        bottom: 0;
      }
      &--rtl {
        right: 0;
        left: initial;
      }

      .Toastify__toast {
        border-radius: 0 !important;
      }
    }

    .Toastify__toast {
      position: relative;
      min-height: 64px;
      box-sizing: border-box;
      margin-bottom: 1rem;
      padding: 8px;
      border-radius: 3px;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
      display: flex;
      justify-content: space-between;
      max-height: 800px;
      overflow: hidden;
      font-size: 1.1rem;
      font-weight: 600;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      cursor: pointer;
      direction: ltr;
      &--rtl {
        direction: rtl;
      }
      &--default {
        background: #fff;
        color: #aaa;
      }
      &--info {
        background: #3498db;
      }
      &--success {
        background: #21C677;
      }
      &--warning {
        background: #f1c40f;
      }
      &--error {
        background: #e74c3c;
      }
      &-body {
        margin: auto 0 auto 0.75rem;
        flex: 1;
      }
    }

    .Toastify__close-button {
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      background: transparent;
      outline: 0;
      border: 0;
      padding: 0;
      cursor: pointer;
      opacity: 0.7;
      transition: color 0.3s ease, opacity 0.3s ease;
      align-self: flex-start;
      &--default {
        color: #fff;
        opacity: 0.3;
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
      background-color: rgba(255, 255, 255, 0.7);
      transform-origin: left;
      &--animated {
        animation: ${Toastify__trackProgress} linear 1 forwards;
      }
      &--controlled {
        transition: transform 0.2s;
      }
      &--rtl {
        right: 0;
        left: initial;
        transform-origin: right;
      }
      &--default {
        background: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
      }
    }
  }

  .Toastify__bounce-enter {
    &--top-right,
    &--bottom-right {
      animation-name: ${Toastify__bounceInRight};
    }
  }

  .Toastify__bounce-exit {
    &--top-right,
    &--bottom-right {
      animation-name: ${Toastify__bounceOutRight};
    }
  }
`;

export default reactToastifyCss;