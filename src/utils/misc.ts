import { ReactText } from 'react';
import { OptionData, SelectedOption } from '../types';
import { EMPTY_ARRAY, OPTION_CLS, OPTION_FOCUSED_CLS, OPTION_SELECTED_CLS, OPTION_DISABLED_CLS } from '../constants';

const _diacriticsRegExp = /[\u0300-\u036f]/g;

/**
 * @private
 * Strips all diacritics from a string.
 * May not be supported by all legacy browsers (IE11 >=).
 */
function stripDiacritics(value: string): string {
  return value.normalize('NFD').replace(_diacriticsRegExp, '');
}

/**
 * Tests if object is an array with at least 1 item.
 */
export function isArrayWithLength(test: any): boolean {
  return Array.isArray(test) && !!test.length;
}

/**
 * Tests for a 'plain, classic' object (non-primitive type that is not an array).
 */
export function isPlainObject(test: any): boolean {
  return test !== null && typeof test === 'object' && !Array.isArray(test);
}

/**
 * Apply regex to string, and if the value is NOT case sensitive,
 * call .toLowerCase() and return result.
 */
export function trimAndFormatFilterStr(
  value: string,
  filterIgnoreCase?: boolean,
  filterIgnoreAccents?: boolean
): string {
  let trimVal = value.trim();

  if (filterIgnoreCase) {
    trimVal = trimVal.toLowerCase();
  }

  return !filterIgnoreAccents ? trimVal : stripDiacritics(trimVal);
}

/**
 * Builds the className property in Option.tsx component.
 */
export function optionClassNames(
  isDisabled?: boolean,
  isSelected?: boolean,
  isFocused?: boolean
): string {
  let className = OPTION_CLS;

  if (isDisabled) className += (' ' + OPTION_DISABLED_CLS);
  if (isSelected) className += (' ' + OPTION_SELECTED_CLS);
  if (isFocused) className += (' ' + OPTION_FOCUSED_CLS);

  return className;
}

/**
 * Parses an object or an array of objects into output of SelectedOption[].
 */
export const normalizeValue = (
  value: any,
  getOptionValue: (data: OptionData) => ReactText,
  getOptionLabel: (data: OptionData) => ReactText
): SelectedOption[] => {
  const initialValues = Array.isArray(value)
    ? value
    : isPlainObject(value)
      ? [value]
      : EMPTY_ARRAY;

  if (!isArrayWithLength(initialValues)) {
    return initialValues;
  }

  return initialValues.map((x: any) => ({
    data: x,
    value: getOptionValue(x),
    label: getOptionLabel(x)
  }));
};

/**
 * Immutable implementation of mergeDeep for two objects. Will return the merged result.
 * In first condition of if/else block - check that property is no 'animation',
 * since we never want to merge that complex styled-component object.
 */
export const mergeDeep = <T>(target: any, source: any): T => {
  const output = { ...target };

  Object.keys(source).forEach((key) => {
    const sourceProp = source[key];

    output[key] =
      (isPlainObject(sourceProp) && key !== 'animation')
        ? (key in target)
          ? mergeDeep(target[key], sourceProp)
          : sourceProp
        : sourceProp || '';
  });

  return output;
};