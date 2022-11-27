import {useRef, useEffect, type EffectCallback, type DependencyList} from 'react';

/**
 * `React.useEffect` that will not run on the first render.
 *
 * @param effect the effect to execute
 * @param deps the dependency list
 */
const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList): void => {
  const isFirstRender = useRef(true);

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
