import { useEffect, useRef } from 'react';

import type { MutableRefObject } from 'react';

/**
 * useCallbackRef hook
 *
 * Stores the callback value to a ref object and exports that ref.
 * This is useful for passed in callback props that are referenced frequently referenced in deps list.
 *
 * @param callback The callback to write to a ref object
 * @param defaultCallback The default value of the callback for when "callback" is undefined
 */
const useCallbackRef = <T>(
  callback?: T,
  defaultCallback?: T
): MutableRefObject<T | undefined> => {
  const callbackRef = useRef<T | undefined>(callback || defaultCallback);

  useEffect(() => {
    callbackRef.current = callback || defaultCallback;
  }, [callback, defaultCallback]);

  return callbackRef;
};

export default useCallbackRef;