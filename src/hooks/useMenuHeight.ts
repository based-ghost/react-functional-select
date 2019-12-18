import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { scrollMenuIntoViewOnOpen } from '../utils';

/**
 * Custom Hook.
 * Handle calculating and maintaining the menuHeight used by react-window.
 * Handle scroll animation and callback execution when menuOpen = true.
 * Handle resetting menuHeight back to the menuHeightDefault and callback execution when menuOpen = false.
 * Use ref to track if the menuHeight was resized, and if so, set the menu height back to default (avoids uncessary renders) with call to setMenuHeight.
 */
export const useMenuHeight = (
  menuRef: MutableRefObject<HTMLDivElement | null>,
  menuOpen: boolean,
  menuHeightDefault: number,
  scrollMenuIntoView?: boolean,
  onMenuOpen?: (...args: any[]) => void,
  onMenuClose?: (...args: any[]) => void
): number => {
  const isFirstRenderRef = useRef<boolean>(true);
  const resetMenuHeightRef = useRef<boolean>(false);
  const [menuHeight, setMenuHeight] = useState<number>(menuHeightDefault);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    if (menuOpen) {
      const handleOnMenuOpen = (availableSpace?: number): void => {
        onMenuOpen && onMenuOpen();
        if (availableSpace) {
          resetMenuHeightRef.current = true;
          setMenuHeight(availableSpace);
        }
      };

      scrollMenuIntoViewOnOpen(menuRef.current, scrollMenuIntoView, handleOnMenuOpen);
    } else {
      onMenuClose && onMenuClose();
      if (resetMenuHeightRef.current) {
        resetMenuHeightRef.current = false;
        setMenuHeight(menuHeightDefault);
      }
    }
  }, [menuRef, menuOpen, onMenuClose, onMenuOpen, menuHeightDefault, scrollMenuIntoView]);

  return menuHeight;
};