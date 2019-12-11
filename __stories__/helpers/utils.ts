export type Option = {
  readonly label: string;
  readonly value: string | number;
};

export type CityOption = {
  readonly id: number;
  readonly city: string;
  readonly state: string;
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
  { id: 10, city: 'Louisville', state: 'KY' },
];

export const numberWithCommas = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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