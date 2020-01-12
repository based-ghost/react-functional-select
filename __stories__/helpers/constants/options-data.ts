import { CityOption, PackageOption } from '../types';

const PACKAGE_OPTIONS: PackageOption[] = [
  { id: 1, packageName: 'react' },
  { id: 2, packageName: 'react-dom' },
  { id: 3, packageName: 'reactstrap' },
  { id: 4, packageName: 'react-scripts' },
  { id: 5, packageName: 'react-window' }
];

const CITY_OPTIONS: CityOption[] = [
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

export {
  CITY_OPTIONS,
  PACKAGE_OPTIONS
}