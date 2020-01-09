import { useRef } from 'react';

/**
 * Hook used to track if a component is mounted and initial effect executed.
 */
export const useIsFirstRender = (): boolean => {
  const isFirst = useRef<boolean>(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return isFirst.current;
};