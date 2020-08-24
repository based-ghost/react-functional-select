/**
 * Menu position in relation to the control.
 * Defaults to 'auto' - meaning, if not enough space below control, then place above.
 */
export enum MenuPositionEnum {
  TOP = 'top',
  AUTO = 'auto',
  BOTTOM = 'bottom'
}

/**
 * Property filterMatchFrom values. Defaults to 'any'.
 * Determines where to match search input in option during filter process.
 */
export enum FilterMatchEnum {
  ANY = 'any',
  START = 'start'
}

/**
 * Arrow key direction for cycling through multi-values.
 */
export enum ValueIndexEnum {
  NEXT = 'next',
  PREVIOUS = 'prev'
}

/**
 * Arrow key direction OR position for cycling through menu options.
 */
export enum OptionIndexEnum {
  UP = 'up',
  DOWN = 'down',
  LAST = 'last',
  FIRST = 'first'
}