import { OptionIndex, ValueIndex } from '../types';

/**
 * Property filterMatchFrom values. Defaults to 'any'.
 * Determines where to match search input in option during filter process.
 */
enum FilterMatchEnum {
  ANY = 'any',
  START = 'start'
}

/**
 * Arrow key direction for cycling through multi-values.
 */
const ValueIndexEnum = Object.freeze<{[key: string]: ValueIndex}>({
  NEXT: 0,
  PREVIOUS: 1
});

/**
 * Arrow key direction OR position for cycling through menu options.
 */
const OptionIndexEnum = Object.freeze<{[key: string]: OptionIndex}>({
  UP: 0,
  DOWN: 1,
  FIRST: 2,
  LAST: 3
});

export {
  FilterMatchEnum,
  ValueIndexEnum,
  OptionIndexEnum
};