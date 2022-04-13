import { useState } from 'react';
import useUpdateEffect from './useUpdateEffect';

/**
 * Debouncer hook (hacky fix to prevent unecessary state mutations if no delay is passed).
 * If a number is passed for the delay parameter, use to debounce/set the value.
 */
const useDebounce = <T>(value: T, delay: number = 0): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useUpdateEffect(() => {
    if (delay <= 0) return;

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return delay <= 0 ? value : debouncedValue;
};

export default useDebounce;