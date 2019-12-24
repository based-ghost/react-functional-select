import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useClearAllToasts = (): void => {
  useEffect(() => {
    toast.dismiss();
  }, []);
};