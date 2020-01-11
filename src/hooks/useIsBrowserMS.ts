import { useRef } from 'react';
import { MS_BROWSER_REGEXP } from '../constants/regexp';

/**
 * Hook that tests window.navigator.userAgent for browser vendor just once and stores in a ref.
 */
export function useIsBrowserMS(): boolean {
  const isBrowserMS = useRef<boolean>();

  if (isBrowserMS.current === undefined) {
    isBrowserMS.current = MS_BROWSER_REGEXP.test(window.navigator.userAgent);
  }

  return isBrowserMS.current;
}