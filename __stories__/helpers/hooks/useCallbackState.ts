import { useCallback, useState } from 'react';

const useCallbackState = <T>(initState: T): [T, (newState: T) => void] => {
  const [state, setState] = useState<T>(initState);
  const setStateCallback = useCallback((newState: T): void => setState(newState), []);
  return [state, setStateCallback];
};

export default useCallbackState;