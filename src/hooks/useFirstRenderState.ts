import { useRef } from 'react';

/**
 * Returns "true" if component is just mounted (first render), else "false".
 */
const useFirstRenderState = (): boolean => {
  const isFirstRenderRef = useRef(true);

  if (isFirstRenderRef.current) {
    isFirstRenderRef.current = false;
    return true;
  }

  return isFirstRenderRef.current;
};

export default useFirstRenderState;