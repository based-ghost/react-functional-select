import type { CallbackFn } from '../types';
import { useEffect, useRef, useCallback } from 'react';

/**
 * Creates a stable callback function that has access to the latest
 * state and can be used within event handlers and effect callbacks.
 *
 * @param callback the callback to write to ref object
 */
const useCallbackRef = <T extends CallbackFn>(callback?: T): T => {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  });

  return useCallback<CallbackFn>((...args) => {
    return ref.current?.(...args);
  }, []) as T;
};

export default useCallbackRef;