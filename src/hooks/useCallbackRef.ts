import type { CallbackFn } from '../types';
import { useEffect, useRef, useCallback } from 'react';

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders
 * ..when passed as a prop or avoid re-executing effects when passed as a dependency
 *
 * @param callback The callback to write to a ref object
 */
const useCallbackRef = <T extends CallbackFn>(
  callback: T | undefined
): T => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback(
    ((...args) => {
      return callbackRef.current?.(...args);
    }) as T,
    []
  );
};

export default useCallbackRef;