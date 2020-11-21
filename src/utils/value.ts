import { ReactText } from 'react';
import { OptionData, SelectedOption } from '../types';
import { isPlainObject, isArrayWithLength } from './object';
import { SELECTED_OPTION_DEFAULT } from '../constants/defaults';
import { OPTION_CLS, OPTION_FOCUSED_CLS, OPTION_SELECTED_CLS, OPTION_DISABLED_CLS } from '../constants/dom';

const DIACRITICS_REGEXP = /[\u0300-\u036f]/g;

/**
 * Strips all diacritics from a string. May not be supported by all legacy browsers (IE11 >=).
 */
function stripDiacritics(value: string): string {
  return value.normalize('NFD').replace(DIACRITICS_REGEXP, '');
}

/**
 * Apply regex to string, and if the value is NOT case sensitive, call .toLowerCase() and return result.
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
export function optionClassName(
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
export function normalizeValue(
  value: any,
  getOptionValue: (data: OptionData) => ReactText,
  getOptionLabel: (data: OptionData) => ReactText
): SelectedOption[] {
  const initialValues = Array.isArray(value)
    ? value
    : isPlainObject(value)
    ? [value]
    : SELECTED_OPTION_DEFAULT;

  return isArrayWithLength(initialValues)
    ? initialValues.map((x: any) => ({
        data: x,
        value: getOptionValue(x),
        label: getOptionLabel(x)
      }))
    : initialValues;
}