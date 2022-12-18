import type { Option } from '../../types';

export const numberWithCommas = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const stringifyJavaScriptObj = (data: any = {}): string => {
  return JSON.stringify(data, null, 2).replace(/"(\w+)"\s*:/g, '$1:');
};

export const mockHttpRequest = async (delay: number = 500): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, delay));
};

export const createOptions = (count: number): Option[] => {
  const options: Option[] = [];

  for (let i = 0; i < count; i++) {
    const value = i + 1;
    options.push({
      value,
      label: `Option ${value}`
    });
  }

  return options;
};

export const createThemeOptions = (themeEnum: any): Option[] => {
  return Object.keys(themeEnum).map((key) => ({
    value: themeEnum[key],
    label: themeEnum[key]
  }));
};

export const createAsyncOptions = (count: number, lblSuffix: string = ''): Option[] => {
  const options = createOptions(count);
  return options.map(({ value, label }: Option) => ({
    value,
    label: `${label}${lblSuffix ? (' - ' + lblSuffix) : ''}`
  }));
};

export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const hexReplacer: string = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
  );

  const alphaValid: number = Math.min(1, Math.max(0, alpha));
  const rgbParts: number[] = hexReplacer.substring(1).match(/.{2}/g)!.map((x) => parseInt(x, 16));
  const rgbaParts = [...rgbParts, alphaValid].join(',');

  return `rgba(${rgbaParts})`;
};