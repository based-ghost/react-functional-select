/**
 * Determines if the current device is touch-enabled.
 */
export const IS_TOUCH_DEVICE = !!window?.ontouchstart || !!navigator?.maxTouchPoints;