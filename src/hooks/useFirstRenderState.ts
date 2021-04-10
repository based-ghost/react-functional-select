import { useRef } from 'react';

/**
 * Returns "true" if component is just mounted (first render), else "false".
 */
const useFirstRenderState = (): boolean => {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return isFirst.current;
};

export default useFirstRenderState;