# react-functional-select

[![Latest Stable Version](https://img.shields.io/npm/v/react-functional-select.svg)](https://www.npmjs.com/package/react-functional-select)
[![License](https://img.shields.io/npm/l/react-functional-select.svg)](./LICENSE)
[![Build Status](https://img.shields.io/travis/based-ghost/react-functional-select/master.svg)](https://travis-ci.org/based-ghost/react-functional-select)

This lightweight package delivers ultimate performance for complex dropdown/select web component scenarios - it effortlessy handles searching, scrolling and keying even when working with data sets numbering in the tens of thousandes. It is powered by [react-window](https://github.com/bvaughn/react-window) and [styled-components](https://www.styled-components.com/). In addition, it is built entirely using `React Hooks` and `FunctionComponents`.

While raw performance and minimal package size were the primary objectives, it is built with an advanced API that should cover the vast majority of use-cases. The API's functionality was largely inspired by [react-select](https://github.com/JedWatson/react-select), which is one of the most flexible and complete React component API's I have seen. Essentially, my aim was to narrow the API's focus down to critical/common/performance-centric areas - and then deliver an optimized solution with as few lines of code as I deemed reasonable.

## Installation (Including peer dependencies)

```bash
# npm
npm i react-window react-styled-components react-functional-select

# Yarn
yarn add react-window react-styled-components react-functional-select
```

## Usage

- [Demo](https://based-ghost.github.io/react-functional-select/index.html?path=/story/react-functional-select--basic)
- [Source code](./__stories__)

#### Example Usage

```JSX
/*** ...IMPORTS... ***/

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
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
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
              isLoading={isLoading}
              isInvalid={isInvalid}
              isDisabled={isDisabled}
              isClearable={isClearable}
              isSearchable={isSearchable}
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
