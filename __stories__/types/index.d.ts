export type Option = Readonly<{
  label: string | number;
  value: string | number;
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