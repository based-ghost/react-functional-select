import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useClearToastsOnUnmount = (): void => {
  useEffect(() => {
    // Run only when component is unmounting
    return () => {
      toast.dismiss();
    };
  }, []);
};