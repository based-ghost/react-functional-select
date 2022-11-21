import { useRef, type MutableRefObject } from "react"

/**
 * Hook to persist value between renders - keeps it up-to-date on changes.
 *
 * @param value the value to persist
 */
const useLatestRef = <T>(value: T): MutableRefObject<T> => {
  const ref = useRef<T>(value);
  ref.current = value;
  return ref;
};

export default useLatestRef;