import { useEffect } from 'react';
import { toast } from 'react-toastify';

// Run only when component is unmounting
export const useClearToastsOnUnmount = (): void => {
  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);
};