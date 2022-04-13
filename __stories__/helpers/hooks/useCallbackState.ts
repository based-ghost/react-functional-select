import { useCallback, useState } from 'react';

const useCallbackState = <T>(initialState: T): [T, (newState: T) => void] => {
  const [state, setState] = useState<T>(initialState);
  const setStateCallback = useCallback((newState: T): void => setState(newState), []);

  return [state, setStateCallback];
};

export default useCallbackState;