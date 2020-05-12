import { useRef } from 'react';

/**
 * Determines if current device is touch-enabled.
 * Prefer (pointer: coarse) over (any-pointer: coarse) since we are likely only targeting the primary input.
 */
export const useIsTouchDevice = (): boolean => {
  const isTouchDevice = useRef<boolean | null>(null);

  if (isTouchDevice.current === null) {
    isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches;
    return isTouchDevice.current;
  }

  return isTouchDevice.current;
};