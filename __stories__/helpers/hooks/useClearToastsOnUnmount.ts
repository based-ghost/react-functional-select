import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useClearToastsOnUnmount = (): void => {
  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);
};