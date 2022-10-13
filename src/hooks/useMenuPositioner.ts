import useCallbackRef from './useCallbackRef';
import useUpdateEffect from './useUpdateEffect';
import { MenuPositionEnum } from '../constants';
import type { CallbackFn } from '../types';
import { useEffect, useState, useRef, type RefObject } from 'react';
import { calculateMenuTop, menuFitsBelowControl, scrollMenuIntoViewOnOpen } from '../utils';

/**
 * Handle calculating and maintaining the menuHeight used by react-window.
 * Handle scroll animation and callback execution when menuOpen = true.
 * Handle resetting menuHeight back to the menuHeightDefault and callback execution when menuOpen = false.
 * Use ref to track if the menuHeight was resized, and if so, set the menu height back to default (avoids uncessary renders) with call to setMenuHeight.
 * Handle determining where to place the menu in relation to control - when menuPosition = 'top' or menuPosition = 'bottom' and there is not sufficient space below control, place on top.
 */
const useMenuPositioner = (
  menuRef: RefObject<HTMLElement | null>,
  controlRef: RefObject<HTMLElement | null>,
  menuOpen: boolean,
  menuPosition: MenuPositionEnum,
  menuItemSize: number,
  menuHeightDefault: number,
  menuOptionsLength: number,
  isMenuPortaled: boolean,
  onMenuOpen?: CallbackFn,
  onMenuClose?: CallbackFn,
  menuScrollDuration?: number,
  scrollMenuIntoView?: boolean
): [string | undefined, number] => {
  const resetMenuHeightRef = useRef(false);
  const shouldScrollRef = useRef(!isMenuPortaled);
  const onMenuOpenRef = useCallbackRef(onMenuOpen);
  const onMenuCloseRef = useCallbackRef(onMenuClose);

  const [menuHeight, setMenuHeight] = useState<number>(menuHeightDefault);
  const [isMenuTopPosition, setIsMenuTopPosition] = useState<boolean>(false);

  useEffect(() => {
    shouldScrollRef.current = !isMenuTopPosition && !isMenuPortaled;
  });

  useEffect(() => {
    const { TOP, AUTO } = MenuPositionEnum;
    const isTopPos = menuPosition === TOP || (menuPosition === AUTO && !menuFitsBelowControl(menuRef.current));
    setIsMenuTopPosition(isTopPos);
  }, [menuRef, menuPosition]);

  useUpdateEffect(() => {
    if (menuOpen) {
      const handleOnMenuOpen = (availableSpace?: number): void => {
        onMenuOpenRef();
        if (availableSpace) {
          resetMenuHeightRef.current = true;
          setMenuHeight(availableSpace);
        }
      };

      shouldScrollRef.current
        ? scrollMenuIntoViewOnOpen(menuRef.current, menuScrollDuration, scrollMenuIntoView, handleOnMenuOpen)
        : handleOnMenuOpen();
    } else {
      onMenuCloseRef();
      if (resetMenuHeightRef.current) {
        resetMenuHeightRef.current = false;
        setMenuHeight(menuHeightDefault);
      }
    }
  }, [menuRef, menuOpen, menuHeightDefault, scrollMenuIntoView, menuScrollDuration, onMenuCloseRef, onMenuOpenRef]);

  // Calculated menu height passed react-window; calculate MenuWrapper <div /> 'top' style prop if menu is positioned above control
  const menuHeightCalc = Math.min(menuHeight, menuOptionsLength * menuItemSize);
  const menuStyleTop = isMenuTopPosition ? calculateMenuTop(menuHeightCalc, menuRef.current, controlRef.current) : undefined;

  return [menuStyleTop, menuHeightCalc];
};

export default useMenuPositioner;