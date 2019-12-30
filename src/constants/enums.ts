import { OptionIndex, ValueIndex } from '../types';

type ValueIndexEnum = { [key: string]: ValueIndex };
type OptionIndexEnum = { [key: string]: OptionIndex };

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
export const ValueIndexEnum = Object.freeze<ValueIndexEnum>({
  NEXT: 0,
  PREVIOUS: 1
});

/**
 * Arrow key direction OR position for cycling through menu options.
 */
export const OptionIndexEnum = Object.freeze<OptionIndexEnum>({
  UP: 0,
  DOWN: 1,
  FIRST: 2,
  LAST: 3
});