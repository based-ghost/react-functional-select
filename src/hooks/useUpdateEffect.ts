import { useEffect } from 'react';
import { useIsFirstRender } from './useIsFirstRender';

/**
 * Run an effect only on updates.
 * Skip the first effect execution that occurrs after initial mount.
 */
export const useUpdateEffect: typeof useEffect = (effect, deps): void => {
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    !isFirstRender && effect();
  }, deps);
};