import useLatestRef from './useLatestRef';
import type { CallbackFn } from '../types';
import useCallbackRef from './useCallbackRef';
import useUpdateEffect from './useUpdateEffect';
import { MenuPositionEnum } from '../constants';
import { useState, useRef, type RefObject } from 'react';
import { calculateMenuTop, menuFitsBelowControl, scrollMenuIntoViewOnOpen } from '../utils';

type MenuPosition = Readonly<{
  menuStyleTop?: string;
  menuHeightCalc: number;
}>;

/**
 * Handle calculating and maintaining the menuHeight used by react-window.
 * Handle scroll animation and callback execution when menuOpen = true.
 * Handle resetting menuHeight back to the menuHeightDefault and callback execution when menuOpen = false.
 * Use ref to track if the menuHeight was resized, and if so, set the menu height back to default (avoids uncessary renders) with call to setMenuHeight.
 * Handle determining where to place the menu in relation to control - when menuPosition = 'top' or menuPosition = 'bottom' and there is not sufficient space below control, place on top.
 */
const useMenuPosition = (
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
): MenuPosition => {
  const isMenuTopPosition =
    menuPosition === MenuPositionEnum.TOP ||
    (menuPosition === MenuPositionEnum.AUTO && !menuFitsBelowControl(menuRef.current));

  const onMenuOpenFn = useCallbackRef(onMenuOpen);
  const onMenuCloseFn = useCallbackRef(onMenuClose);
  const resetMenuHeightRef = useRef<boolean>(false);
  const [menuHeight, setMenuHeight] = useState<number>(menuHeightDefault);
  const shouldScrollRef = useLatestRef<boolean>(!isMenuTopPosition && !isMenuPortaled);

  useUpdateEffect(() => {
    if (menuOpen) {
      const handleOnMenuOpen = (availableSpace?: number) => {
        onMenuOpenFn();
        if (availableSpace) {
          resetMenuHeightRef.current = true;
          setMenuHeight(availableSpace);
        }
      };

      shouldScrollRef.current
        ? scrollMenuIntoViewOnOpen(
            menuRef.current,
            menuScrollDuration,
            scrollMenuIntoView,
            handleOnMenuOpen
          )
        : handleOnMenuOpen();
    } else {
      onMenuCloseFn();
      if (resetMenuHeightRef.current) {
        resetMenuHeightRef.current = false;
        setMenuHeight(menuHeightDefault);
      }
    }
  }, [
    menuRef,
    menuOpen,
    shouldScrollRef,
    menuHeightDefault,
    scrollMenuIntoView,
    menuScrollDuration,
    onMenuOpenFn,
    onMenuCloseFn
  ]);

  // calculate menu height for react-window
  // calculate MenuWrapper el 'top' css prop (if menu is positioned above control)
  const menuHeightCalc = Math.min(menuHeight, menuOptionsLength * menuItemSize);
  const menuStyleTop = isMenuTopPosition ? calculateMenuTop(menuHeightCalc, menuRef.current, controlRef.current) : undefined;

  return {
    menuStyleTop,
    menuHeightCalc
  };
};

export default useMenuPosition;