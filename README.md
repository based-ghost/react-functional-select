# react-functional-select

> Micro-sized & micro-optimized select component for ReactJS

[![Latest Stable Version](https://img.shields.io/npm/v/react-functional-select.svg?style=for-the-badge)](https://www.npmjs.com/package/react-functional-select)
[![Travis](https://img.shields.io/badge/ci-travis-green.svg?style=for-the-badge)](https://travis-ci.org/based-ghost/react-functional-select)
[![NPM license](https://img.shields.io/badge/license-mit-red.svg?style=for-the-badge)](LICENSE.md)

## Inspiration
This project was inspired by [`react-select`](https://github.com/JedWatson/react-select). If you need some features not provided, I suggest checking that package out.

## Install

```bash
# npm
npm i react-window styled-components react-functional-select

# Yarn
yarn add react-window styled-components react-functional-select
```

## Overview
Essentially, this is a subset of `react-select`'s API, engineered for ultimate performance and minimal footprint. It is built entirely using `React Hooks` and `FunctionComponents`. In addition, most of the code I was able to roll myself, so there are minimal peer dependencies to worry about:

- [``react-window``](https://github.com/bvaughn/react-window) leveraged for integrated data virtualization/windowing (easily handles data-sets numbering in the tens of thousands with minimal-to-no impact on normally resource-intensive actions like keying and searching).
- [`styled-components`](https://github.com/styled-components/styled-components) to handle dynamic, extensible styling via CSS-in-JS (there is also the option to generate `className` attributes for legacy stylesheets as a fall-back option).

While still a work in progress, its current state should be suitable for many use-cases. Please feel free to contribute and/or make suggestions - specificaly, in the following areas:
- Additional flexibility to the styling system. Currently handles simple-to-mid level complexity scenarios via `styled-component`'s overrideable `ThemeProvider`. As a fallback, you generate static `className` attributes on container nodes.
- The ability to handle complex, multi-select scenarios (while keeping with the theme of optimal performance in as few lines of code as possible).

## Usage

- [Demo](https://based-ghost.github.io/react-functional-select/index.html?path=/story/react-functional-select--basic)
- [Source code](./__stories__)

#### Condensed BasicProps.story.tsx

```TSX
import { Select } from 'react-functional-select';
import { Card, CardHeader, CardBody, Container, SelectContainer } from './helpers/styled';

type CityOption = {
  readonly id: number;
  readonly city: string;
  readonly state: string;
};

const _options: CityOption[] = [
  { id: 1, city: 'Austin', state: 'TX' },
  { id: 2, city: 'Denver', state: 'CO' },
  { id: 3, city: 'Chicago', state: 'IL' },
  { id: 4, city: 'Phoenix', state: 'AZ' },
  { id: 5, city: 'Houston', state: 'TX' },
];

const BasicProps: React.FC = () => {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isClearable, setIsClearable] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<CityOption | null>(null);
  
  const onOptionChange = useCallback((option: CityOption | null): void => {
    setSelectedOption(option);
  }, []);
  
  const getOptionValue = useCallback((option: CityOption): number => (option.id), []);
  const getOptionLabel = useCallback((option: CityOption): string => (`${option.city}, ${option.state}`), []);

  useEffect(() => {
    isDisabled && setIsInvalid(false);
  }, [isDisabled]);

  return (
    <Container>
      <Card>
        <CardHeader>
          {JSON.stringify(selectedOption || {})}
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              options={_options}
              isInvalid={isInvalid}
              isDisabled={isDisabled}
              isClearable={isClearable}
              onOptionChange={onOptionChange}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
};
```

#### TODO: complete unit tests & documentation write-ups..
