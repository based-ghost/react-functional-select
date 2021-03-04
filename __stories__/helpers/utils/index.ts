import { Option } from '../../types';

export const stringifyJavaScriptObj = (data: any = {}): string => {
  return JSON.stringify(data, null, 2).replace(/"(\w+)"\s*:/g, '$1:');
};

export const mockHttpRequest = async (delay: number = 500): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, delay));
};

export const createSelectOptions = (optionCount: number): Option[] => {
  const results: Option[] = [];

  for (let i = 0; i < optionCount; i += 1) {
    const value = i + 1;
    results.push({
      value,
      label: 'Option ' + value
    });
  }

  return results;
};

export const createAsyncOptions = (
  optionCount: number,
  lblSuffix: string
): Option[] => {
  const options = createSelectOptions(optionCount);

  return options.map(({ value, label }: Option) => ({
    value,
    label: `${label} - ${lblSuffix}`
  }));
};

export const createThemeOptions = (ThemeEnum: any): Option[] => {
  const keys = Object.keys(ThemeEnum);

  return keys.map((key) => ({
    value: ThemeEnum[key],
    label: ThemeEnum[key]
  }));
};

export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const hexReplacer: string = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_m, r, g, b): string => `#${r}${r}${g}${g}${b}${b}`
  );

  const alphaValid: number = Math.min(1, Math.max(0, alpha));
  const rgbParts: number[] = hexReplacer.substring(1).match(/.{2}/g)!.map((x) => parseInt(x, 16));
  const rgbaParts: number[] = [...rgbParts, alphaValid];

  return `rgba(${rgbaParts.join(',')})`;
};

export const numberWithCommas = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;