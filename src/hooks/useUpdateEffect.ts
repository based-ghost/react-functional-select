import { useEffect } from 'react';
import useFirstRenderState from './useFirstRenderState';

/**
 * Run an effect only on updates.
 * Skip the first effect execution that occurrs after initial mount.
 */
const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstRender = useFirstRenderState();

  useEffect(() => {
    if (!isFirstRender) {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;