import type { SyntheticEvent } from 'react';
import type { SelectedOption, OptionValueCallback, OptionLabelCallback } from '../types';
import { OPTION_CLS, EMPTY_ARRAY, OPTION_FOCUSED_CLS, OPTION_SELECTED_CLS, OPTION_DISABLED_CLS } from '../constants';

const DIACRITICS_REG_EXP = /[\u0300-\u036f]/g;

/**
 * @private
 *
 * Strips all diacritics from a string.
 * May not be supported by all legacy browsers (IE11 >=).
 */
const stripDiacritics = (val: string): string => {
  return val.normalize('NFD').replace(DIACRITICS_REG_EXP, '');
};

export const isBoolean = (val: unknown): val is Boolean => typeof val === 'boolean';
export const isFunction = (val: unknown): val is Function => typeof val === 'function';
export const isArrayWithLength = (val: unknown): boolean => Array.isArray(val) && !!val.length;
export const isPlainObject = (val: unknown): boolean => val !== null && typeof val === 'object' && !Array.isArray(val);

/**
 * Call preventDefault() and stopPropagation() on event.
 */
export const suppressEvent = (e: SyntheticEvent<Element>): void => {
  e.preventDefault();
  e.stopPropagation();
};

/**
 * Apply regex to string, and if the value is NOT case sensitive,
 * call .toLowerCase() and return result.
 */
export const trimAndFormatFilterStr = (
  value: string,
  filterIgnoreCase: boolean,
  filterIgnoreAccents: boolean
): string => {
  let trimVal = value.trim();
  if (filterIgnoreCase) {
    trimVal = trimVal.toLowerCase();
  }

  return !filterIgnoreAccents ? trimVal : stripDiacritics(trimVal);
};

/**
 * Builds the className property in Option.tsx component.
 */
export const buildOptionClsName = (
  isDisabled: boolean,
  isSelected: boolean,
  isFocused: boolean
): string => {
  let className = OPTION_CLS;

  if (isDisabled) className += ' ' + OPTION_DISABLED_CLS;
  if (isSelected) className += ' ' + OPTION_SELECTED_CLS;
  if (isFocused) className += ' ' + OPTION_FOCUSED_CLS;

  return className;
};

/**
 * Parses an object or an array of objects into output of SelectedOption[].
 */
export const normalizeValue = (
  value: any,
  getOptionValue: OptionValueCallback,
  getOptionLabel: OptionLabelCallback
): SelectedOption[] => {
  const initValues = Array.isArray(value)
    ? value
    : isPlainObject(value)
      ? [value]
      : EMPTY_ARRAY;

  if (!isArrayWithLength(initValues)) {
    return initValues;
  }

  return initValues.map((data: any) => ({
    data,
    value: getOptionValue(data),
    label: getOptionLabel(data)
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
      (key !== 'animation' && isPlainObject(sourceProp))
        ? target[key]
          ? mergeDeep(target[key], sourceProp)
          : sourceProp
        : sourceProp ?? '';
  });

  return output;
};