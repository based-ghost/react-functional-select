import { Option } from './types';
import { toast } from 'react-toastify';

export const renderInfoToast = (message: string): void => {
  toast.info(message);
};

export const stringifyJavaScriptObj = (data: any): string => {
  return JSON.stringify(data || {}, null, 2)
    .replace(/"(\w+)"\s*:/g, '$1:')
    .replace(/"/g, "'");
};

export const createSelectOptions = (optionCount: number): Option[] => {
  const results: Option[] = [];
  for (let i = 0; i < optionCount; i += 1) {
    results.push({
      value: i + 1,
      label: `Option ${i + 1}`
    });
  }
  return results;
};

export const createAsyncOptions = (optionCount: number, labelSuffix: string): Option[] => {
  const options = createSelectOptions(optionCount);

  return options.map((option) => ({
    value: `${option.value}${labelSuffix}`,
    label: `${option.label} - ${labelSuffix}`
  }));
};

export const createThemeOptions = (ThemeEnum: any): Option[] => {
  return Object.keys(ThemeEnum).map((key) => ({
    value: ThemeEnum[key],
    label: ThemeEnum[key]
  }));
};

export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const hexReplacer: string = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (m, r, g, b): string => `#${r}${r}${g}${g}${b}${b}`
  );

  const alphaValid: number = Math.min(1, Math.max(0, alpha));

  const rgbaParts: number[] = [
    ...hexReplacer.substring(1).match(/.{2}/g)!.map((x: string): number => parseInt(x, 16)),
    alphaValid
  ];

  return `rgba(${rgbaParts.join(',')})`;
};

export async function mockHttpRequest(delay: number = 500): Promise<void> {
  // tslint:disable-next-line: no-string-based-set-timeout
  await new Promise(resolve => setTimeout(resolve, delay));
}

export const numberWithCommas = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;