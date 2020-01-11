import { ReactText } from 'react';
import { toast } from 'react-toastify';

export type Option = {
  readonly label: ReactText;
  readonly value: ReactText;
};

export type CityOption = {
  readonly id: number;
  readonly city: string;
  readonly state: string;
};

export const renderInfoToast = (message: string): void => {
  toast.info(message);
};

export const numberWithCommas = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const stringifyJavascriptObj = (data: any): string => {
  return JSON.stringify(data || {}, null, 2)
    .replace(/"(\w+)"\s*:/g, '$1:')
    .replace(/"/g, '\'');
};

export const createSelectOptions = (optionCount: number): Option[] => {
  const results: Option[] = [];
  for (let i = 0; i < optionCount; i += 1) {
    results.push({
      value: i + 1,
      label: `Option ${i + 1}`,
    });
  }
  return results;
};

export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const hexReplacer: string = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (m, r, g, b): string => `#${r}${r}${g}${g}${b}${b}`
  );

  const alphaValid = Math.min(1, Math.max(0, alpha));
  const rgbaParts: number[] = hexReplacer
    .substring(1)
    .match(/.{2}/g)
    .map((x: string): number => parseInt(x, 16));

  rgbaParts.push(alphaValid);

  return `rgba(${rgbaParts.join(',')})`;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  const hexParts: string[] = [r, g, b].map((x: number): string => {
    const hex = x.toString(16);
    return (hex.length === 1) ? `0${hex}` : hex;
  });

  return `#${hexParts.join('')}`;
};

export const CITY_OPTIONS: CityOption[] = [
  { id: 1, city: 'Boston', state: 'MA' },
  { id: 2, city: 'Austin', state: 'TX' },
  { id: 3, city: 'Denver', state: 'CO' },
  { id: 4, city: 'Chicago', state: 'IL' },
  { id: 5, city: 'Phoenix', state: 'AZ' },
  { id: 6, city: 'Houston', state: 'TX' },
  { id: 7, city: 'Orlando', state: 'FL' },
  { id: 8, city: 'Portland', state: 'OR' },
  { id: 9, city: 'Milwaukee', state: 'WI' },
  { id: 10, city: 'Louisville', state: 'KY' }
];
