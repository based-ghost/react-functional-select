import { useRef } from 'react';

/**
 * Determines if current device is touch-enabled.
 * Switched from 'window.matchMedia('(pointer: coarse)').matches' after seeing failures in Edge.
 */
export const useIsTouchDevice = (): boolean => {
  const isTouchDevice = useRef<boolean | null>(null);

  if (isTouchDevice.current === null) {
    isTouchDevice.current = ('ontouchstart' in window || !!navigator.maxTouchPoints);
    return isTouchDevice.current;
  }

  return isTouchDevice.current;
};