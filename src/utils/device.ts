import { isBoolean } from './common';

let _isTouchDevice: boolean | undefined;

/**
 * Determines if the current device is touch-enabled.
 * Global, lazy evaluation.
 */
export const isTouchDevice = (): boolean => {
  if (isBoolean(_isTouchDevice)) return _isTouchDevice;

  return (_isTouchDevice = (() => {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  })());
};