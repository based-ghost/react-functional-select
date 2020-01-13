import { css, keyframes } from 'styled-components';

const TOASTIFY_TRACK_PROGRESS = keyframes`
  0% {
    transform: scaleX(1);
  } 100% {
    transform: scaleX(0);
  }
`;

const TOASTIFY_BOUCE_OUT_RIGHT = keyframes`
  20% {
    opacity: 1;
    transform: translate3d(-20px, 0, 0);
  } to {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }
`;

const TOASTIFY_BOUNCE_IN_RIGHT = keyframes`
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

export default css`
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
      border-radius: 3px;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
      display: flex;
      justify-content: space-between;
      max-height: 800px;
      overflow: hidden;
      font-size: 1.075rem;
      font-weight: 600;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      cursor: pointer;
      direction: ltr;
      &--default {
        background: #fff;
        color: #aaa;
      }
      &--info {
        color: #fff;
        background: #149DF3;
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
      font-weight: 700;
      font-size: 1rem;
      background: transparent;
      outline: none;
      border: none;
      padding: 0;
      cursor: pointer;
      opacity: 0.7;
      transition: color 0.3s ease, opacity 0.3s ease;
      align-self: flex-start;
      &--default {
        color: #000;
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
        animation: ${TOASTIFY_TRACK_PROGRESS} linear 1 forwards;
      }
      &--controlled {
        transition: transform 0.2s;
      }
      &--default {
        background: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
      }
    }
  }

  .Toastify__bounce-enter {
    &--top-right {
      animation-name: ${TOASTIFY_BOUNCE_IN_RIGHT};
    }
  }

  .Toastify__bounce-exit {
    &--top-right {
      animation-name: ${TOASTIFY_BOUCE_OUT_RIGHT};
    }
  }
`;