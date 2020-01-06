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

export const renderSuccessToast = (message: string): void => {
  toast.success(message);
};

export const numberWithCommas = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const stringifyJsonObj = (data: any): string => {
  return JSON.stringify(data || {}, null, 2)
    .replace(/"/g, '')
    .replace(/\\n/g, '')
    .replace(/\\/g, '');
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
