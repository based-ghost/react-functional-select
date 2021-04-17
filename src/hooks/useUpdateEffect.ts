import { useEffect, useRef } from 'react';

/**
 * useUpdateEffect hook
 *
 * Run an effect only on updates.
 * Skip the first effect execution that occurrs after initial mount.
 */
const useUpdateEffect: typeof useEffect = (effect, deps): void => {
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      return effect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateEffect;