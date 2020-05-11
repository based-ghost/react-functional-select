import { OptionIndex, ValueIndex } from '../types';

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
export const ValueIndexEnum: {[key: string]: ValueIndex} = {
  NEXT: 0,
  PREVIOUS: 1
};

/**
 * Arrow key direction OR position for cycling through menu options.
 */
export const OptionIndexEnum: {[key: string]: OptionIndex} = {
  UP: 0,
  DOWN: 1,
  FIRST: 2,
  LAST: 3
};