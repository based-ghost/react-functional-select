import { useUpdateEffect } from './useUpdateEffect';
import { MenuPositionEnum } from '../constants/enums';
import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { calculateMenuTop, menuFitsBelowControl, scrollMenuIntoViewOnOpen } from '../utils';

/**
 * Handle calculating and maintaining the menuHeight used by react-window.
 * Handle scroll animation and callback execution when menuOpen = true.
 * Handle resetting menuHeight back to the menuHeightDefault and callback execution when menuOpen = false.
 * Use ref to track if the menuHeight was resized, and if so, set the menu height back to default (avoids uncessary renders) with call to setMenuHeight.
 * Handle determining where to place the menu in relation to control - when menuPosition = 'top' or menuPosition = 'bottom' and there is not sufficient space below control, place on top.
 */
export const useMenuPositioner = (
  menuRef: MutableRefObject<HTMLDivElement | null>,
  controlRef: MutableRefObject<HTMLDivElement | null>,
  menuOpen: boolean,
  menuPosition: 'top' | 'auto' | 'bottom',
  menuItemSize: number,
  menuHeightDefault: number,
  menuOptionsLength: number,
  menuScrollDuration?: number,
  scrollMenuIntoView?: boolean,
  onMenuOpen?: (...args: any[]) => any,
  onMenuClose?: (...args: any[]) => any
): { menuStyleTop: string | undefined, menuHeightCalc: number } => {
  const resetMenuHeightRef = useRef<boolean>(false);
  const isMenuTopPositionRef = useRef<boolean>(false);

  const [menuHeight, setMenuHeight] = useState<number>(menuHeightDefault);
  const [isMenuTopPosition, setIsMenuTopPosition] = useState<boolean>(menuPosition === MenuPositionEnum.TOP);

  useEffect(() => {
    isMenuTopPositionRef.current = isMenuTopPosition;
  }, [isMenuTopPosition]);

  useEffect(() => {
    const isTopPosition =
      menuPosition === MenuPositionEnum.TOP ||
      (menuPosition === MenuPositionEnum.AUTO && !menuFitsBelowControl(menuRef.current));

    setIsMenuTopPosition(isTopPosition);
  }, [menuRef, menuPosition]);

  useUpdateEffect(() => {
    if (menuOpen) {
      const handleOnMenuOpen = (availableSpace?: number): void => {
        onMenuOpen && onMenuOpen();
        if (availableSpace) {
          resetMenuHeightRef.current = true;
          setMenuHeight(availableSpace);
        }
      };

      !isMenuTopPositionRef.current
        ? scrollMenuIntoViewOnOpen(menuRef.current, menuScrollDuration, scrollMenuIntoView, handleOnMenuOpen)
        : handleOnMenuOpen();
    } else {
      onMenuClose && onMenuClose();
      if (resetMenuHeightRef.current) {
        resetMenuHeightRef.current = false;
        setMenuHeight(menuHeightDefault);
      }
    }
  }, [menuRef, menuOpen, onMenuClose, onMenuOpen, menuHeightDefault, scrollMenuIntoView, menuScrollDuration]);

  // Calculated menu height passed react-window; calculate MenuWrapper <div /> 'top' style prop if menu is positioned above control
  const menuHeightCalc = Math.min(menuHeight, menuOptionsLength * menuItemSize);
  const menuStyleTop = isMenuTopPosition ? calculateMenuTop(menuHeightCalc, menuRef.current, controlRef.current) : undefined;

  return { menuStyleTop, menuHeightCalc };
};