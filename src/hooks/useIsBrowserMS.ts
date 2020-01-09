import { useRef } from 'react';

/**
 * Hook that tests window.navigator.userAgent for browser vendor just once and stores in a ref.
 */
export const useIsBrowserMS = (): boolean => {
  const isBrowserMS = useRef<boolean>();

  if (isBrowserMS.current === undefined) {
    isBrowserMS.current = (/MSIE |Trident\/|Edge\//).test(window.navigator.userAgent);
  }

  return isBrowserMS.current;
};