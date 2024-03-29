import type { SyntheticEvent } from 'react';
import type { SelectedOption, OptionValueCallback, OptionLabelCallback, CallbackFn } from '../types';
import { OPTION_CLS, EMPTY_ARRAY, OPTION_FOCUSED_CLS, OPTION_SELECTED_CLS, OPTION_DISABLED_CLS } from '../constants';

const DIACRITICS_REG_EXP = /[\u0300-\u036f]/g;

/**
 * Strips all diacritics from a string.
 */
const stripDiacritics = (val: string): string => {
  return val.normalize('NFD').replace(DIACRITICS_REG_EXP, '');
};

export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean';
export const isFunction = (val: unknown): val is CallbackFn => typeof val === 'function';
export const isArrayWithLength = (val: unknown): boolean => Array.isArray(val) && !!val.length;
export const isPlainObject = (val: unknown): boolean => val !== null && typeof val === 'object' && !Array.isArray(val);

/**
 * Prevent default behavior and propagation of an event
 */
export const suppressEvent = (e: SyntheticEvent): void => {
  e.preventDefault();
  e.stopPropagation();
};

/**
 * Apply regex to string, and if the value is NOT case sensitive,
 * call .toLowerCase() and return result
 */
export const trimAndFormatFilterStr = (
  value: string,
  filterIgnoreCase: boolean,
  filterIgnoreAccents: boolean
): string => {
  let trimVal = value.trim();
  if (filterIgnoreCase) trimVal = trimVal.toLowerCase();
  return !filterIgnoreAccents ? trimVal : stripDiacritics(trimVal);
};

/**
 * Builds the className property in Option.tsx component
 */
export const buildOptionClass = (
  isDisabled: boolean,
  isSelected: boolean,
  isFocused: boolean
): string => {
  let cx = OPTION_CLS;

  if (isDisabled) cx += ' ' + OPTION_DISABLED_CLS;
  if (isSelected) cx += ' ' + OPTION_SELECTED_CLS;
  if (isFocused) cx += ' ' + OPTION_FOCUSED_CLS;

  return cx;
};

/**
 * Parses an object or an array of objects into output of SelectedOption[]
 */
export const normalizeValue = (
  value: unknown,
  getOptionValue: OptionValueCallback,
  getOptionLabel: OptionLabelCallback
): SelectedOption[] => {
  const initVals = Array.isArray(value)
    ? value
    : isPlainObject(value)
      ? [value]
      : EMPTY_ARRAY;

  if (!isArrayWithLength(initVals)) {
    return initVals;
  }

  return initVals.map((data) => ({
    data,
    value: getOptionValue(data),
    label: getOptionLabel(data)
  }));
};

/**
 * Immutable implementation of mergeDeep for two objects. Will return the merged result
 * In first condition - check that property is no 'animation', since we never want to
 * merge that complex styled-component object
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
        : sourceProp;
  });

  return output;
};