/**
 * Menu position in relation to the control.
 * Defaults to 'auto' - meaning, if not enough space below control, then place above.
 */
export const MenuPositionEnum = {
  TOP: 'top',
  AUTO: 'auto',
  BOTTOM: 'bottom'
} as const;

export type MenuPositionEnum = typeof MenuPositionEnum[keyof typeof MenuPositionEnum];

/**
 * Property filterMatchFrom values. Defaults to 'any'.
 * Determines where to match search input in option during filter process.
 */
export const FilterMatchEnum = {
  ANY: 'any',
  START: 'start'
} as const;

export type FilterMatchEnum = typeof FilterMatchEnum[keyof typeof FilterMatchEnum];

/**
 * Arrow key direction for cycling through multi-values.
 */
export const ValueIndexEnum = {
  NEXT: 0,
  PREVIOUS: 1
} as const;

export type ValueIndexEnum = typeof ValueIndexEnum[keyof typeof ValueIndexEnum];

/**
 * Arrow key direction OR position for cycling through menu options.
 */
export const OptionIndexEnum = {
  UP: 0,
  DOWN: 1,
  LAST: 2,
  FIRST: 3
} as const;

export type OptionIndexEnum = typeof OptionIndexEnum[keyof typeof OptionIndexEnum];