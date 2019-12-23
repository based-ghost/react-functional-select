import { useState, useRef, MutableRefObject } from 'react';
import { useUpdateEffect } from './useUpdateEffect';
import { scrollMenuIntoViewOnOpen } from '../utils';

/**
 * Handle calculating and maintaining the menuHeight used by react-window.
 * Handle scroll animation and callback execution when menuOpen = true.
 * Handle resetting menuHeight back to the menuHeightDefault and callback execution when menuOpen = false.
 * Use ref to track if the menuHeight was resized, and if so, set the menu height back to default (avoids uncessary renders) with call to setMenuHeight.
 */
export const useMenuHeight = (
  menuRef: MutableRefObject<HTMLDivElement | null>,
  menuOpen: boolean,
  menuHeightDefault: number,
  menuScrollDuration?: number,
  scrollMenuIntoView?: boolean,
  onMenuOpen?: (...args: any[]) => void,
  onMenuClose?: (...args: any[]) => void
): number => {
  const resetMenuHeight = useRef<boolean>(false);
  const [menuHeight, setMenuHeight] = useState<number>(menuHeightDefault);

  useUpdateEffect(() => {
    if (menuOpen) {
      const handleOnMenuOpen = (availableSpace?: number): void => {
        onMenuOpen && onMenuOpen();
        if (availableSpace) {
          resetMenuHeight.current = true;
          setMenuHeight(availableSpace);
        }
      };

      scrollMenuIntoViewOnOpen(
        menuRef.current,
        menuScrollDuration,
        scrollMenuIntoView,
        handleOnMenuOpen
      );
    } else {
      onMenuClose && onMenuClose();
      if (resetMenuHeight.current) {
        resetMenuHeight.current = false;
        setMenuHeight(menuHeightDefault);
      }
    }
  }, [menuRef, menuOpen, onMenuClose, onMenuOpen, menuHeightDefault, scrollMenuIntoView, menuScrollDuration]);

  return menuHeight;
};