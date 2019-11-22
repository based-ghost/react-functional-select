import { useCallback, useEffect, useState, MutableRefObject } from 'react';
import { scrollMenuIntoViewOnOpen } from '../utils';

/**
 * Hook: useMenuHeight.
 * Handle calculating and maintaining the menuHeight used by react-window.
 * Handle scroll animation and callback execution when menuOpen = true.
 * Handle resetting menuHeight back to the menuHeightDefault and callback execution when menuOpen = false.
 */
export const useMenuHeight = (
  menuRef: MutableRefObject<HTMLDivElement | null>,
  menuOpen: boolean,
  menuHeightDefault: number,
  scrollMenuIntoView?: boolean,
  onMenuOpen?: (...args: any[]) => void,
  onMenuClose?: (...args: any[]) => void
): number => {
  const [menuHeight, setMenuHeight] = useState<number>(menuHeightDefault);

  const handleOnMenuOpen = useCallback((availableSpace?: number): void => {
    availableSpace && setMenuHeight(availableSpace);
    onMenuOpen && onMenuOpen();
  }, [onMenuOpen]);

  useEffect(() => {
    if (menuOpen) {
      scrollMenuIntoViewOnOpen(menuRef.current, scrollMenuIntoView, handleOnMenuOpen);
    } else {
      setMenuHeight(menuHeightDefault);
      onMenuClose && onMenuClose();
    }
  }, [menuRef, menuOpen, onMenuClose, handleOnMenuOpen, menuHeightDefault, scrollMenuIntoView]);

  return menuHeight;
};