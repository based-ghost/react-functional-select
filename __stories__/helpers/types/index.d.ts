import { ReactText } from 'react';

export type Option = {
  readonly label: ReactText;
  readonly value: ReactText;
};

export type CityOption = {
  readonly id: number;
  readonly city: string;
  readonly state: string;
};

export type PackageOption = {
  readonly id: number;
  readonly packageName: string;
};