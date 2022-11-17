import { useRef, useEffect } from 'react';

/**
 * Run an effect only on updates.
 * Skip the first effect execution that occurrs on initial mount.
 *
 * @param effect the effect to execute
 * @param deps the dependency list
 */
const useUpdateEffect: typeof useEffect = (effect, deps): void => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;