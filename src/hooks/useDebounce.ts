import { useEffect, useState } from 'react';

/**
 * Hook: useDebounce.
 * Generic debouncer hook (potential hack to prevent unecessary state mutations if no delay is passed).
 * If a number is passed for the delay parameter, use to debounce/set the value.
 */
export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (delay === undefined) {
      return undefined;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return (delay === undefined) ? value : debouncedValue;
};