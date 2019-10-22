# react-functional-select

[![Latest Stable Version](https://img.shields.io/npm/v/react-functional-select.svg)](https://www.npmjs.com/package/react-functional-select)
[![License](https://img.shields.io/npm/l/react-functional-select.svg)](./LICENSE)
[![Build Status](https://img.shields.io/travis/based-ghost/react-functional-select/master.svg)](https://travis-ci.org/based-ghost/react-functional-select)

This lightweight package delivers ultimate performance for complex dropdown/select web component scenarios - it effortlessy handles searching, scrolling and keying even when working with data sets numbering in the tens of thousandes. It is powered by [react-window](https://github.com/bvaughn/react-window) (for data virtualization) and [styled-components](https://www.styled-components.com/) (for flexible, performant styling). In addition, it is built entirely using `React Hooks` and `FunctionComponents`.

While raw performance and minimal package size were the primary objectives, it is built with an advanced API that should cover the vast majority of use-cases. The API's functionality was largely inspired by [react-select](https://github.com/JedWatson/react-select), which is one of the best examples you will find of a flexible and complete API designed to handle a very specific, and usually painful, problem that web developers encounter. Essentially, my aim was to narrow the API's focus down to critical/common/performance pieces of functionality - using a functional approach that allowed for low-code, high-performance solutions to these use-cases.

## Installation (Including peer dependencies)

```bash
# npm
npm i react-window react-styled-components react-functional-select

# Yarn
yarn add react-window react-styled-components react-functional-select
```

## Usage

- [Demo](https://based-ghost.github.io/react-functional-select/index.html?path=/story/react-functional-select--basic)
- [Source code](./src/__stories__)

#### Example (BasicProps.story.tsx)

```JSX
/*** ...IMPORTS... ***/

type CityOption = {
  readonly id: number;
  readonly city: string;
  readonly state: string;
};

const SelectedLabelText = styled.span`
  margin-left: 0px;
  font-weight: 600;
`;

const SelectedCode = styled(Code)`
  font-weight: 400;
  font-size: 0.875em;
`;

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

  const getOptionValue = useCallback((option: CityOption): number => {
    return option.id;
  }, []);

  const getOptionLabel = useCallback((option: CityOption): string => {
    return `${option.city}, ${option.state}`;
  }, []);
  
  const onOptionChange = useCallback((option: CityOption | null): void => {
    setSelectedOption(option);
  }, []);

  useEffect(() => {
    isDisabled && setIsInvalid(false);
  }, [isDisabled]);

  return (
    <Container>
      <Title>Basic Properties</Title>
      <Hr />
      <Paragraph>Description of story...</Paragraph>
      <Paragraph>Description of story continued...</Paragraph>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <CheckboxGroup>
            <Checkbox
              label='Searchable'
              checked={isSearchable}
              onCheck={setIsSearchable}
            />
            <Checkbox
              label='Clearable'
              checked={isClearable}
              onCheck={setIsClearable}
            />
            <Checkbox
              label='Disabled'
              checked={isDisabled}
              onCheck={setIsDisabled}
            />
            <Checkbox
              label='Invalid'
              checked={isInvalid}
              readOnly={isDisabled}
              onCheck={setIsInvalid}
            />
            <Checkbox
              label='Loading'
              checked={isLoading}
              onCheck={setIsLoading}
            />
            <Label>
              <SelectedLabelText>Selected Option: </SelectedLabelText>
              <SelectedCode>{selectedOption ? JSON.stringify(selectedOption) : 'NULL'}</SelectedCode>
            </Label>
          </CheckboxGroup>
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

#### TODO: hook up test-runner and scripts; finish writing unit tests leveraging `@testing-library/react` framework; complete documentation for props/api
