import type { ReactText } from 'react';

export type Option = Readonly<{
  label: ReactText;
  value: ReactText;
}>;

export type CityOption = Readonly<{
  id: number;
  city: string;
  state: string;
}>;

export type PackageOption = Readonly<{
  id: number;
  name: string;
}>;