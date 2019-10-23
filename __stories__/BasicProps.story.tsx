import React, { useState, useEffect, useCallback } from 'react';
import { Select } from '..';
import styled from 'styled-components';
import Checkbox from './helpers/Checkbox';
import { storiesOf } from '@storybook/react';
import { Hr, Title, Label, SubTitle, Container, SelectContainer, Paragraph, Code, CheckboxGroup, Card, CardHeader, CardBody } from './helpers/styled';

type CityOption = {
  readonly id: number;
  readonly city: string;
  readonly state: string;
};

const SelectedCode = styled(Code)`
  font-weight: 400;
  font-size: 0.875em;
`;

const SelectedLabelText = styled.span`
  margin-left: 0px;
  font-weight: 600;
`;

const _options: CityOption[] = [
  { id: 1,  city: 'Austin',      state: 'TX' },
  { id: 2,  city: 'Denver',      state: 'CO' },
  { id: 3,  city: 'Chicago',     state: 'IL' },
  { id: 4,  city: 'Phoenix',     state: 'AZ' },
  { id: 5,  city: 'Houston',     state: 'TX' },
  { id: 6,  city: 'Las Vegas',   state: 'NV' },
  { id: 7,  city: 'Milwaukee',   state: 'WI' },
  { id: 8,  city: 'Louisville',  state: 'KY' },
  { id: 9,  city: 'Los Angeles', state: 'CA' },
  { id: 10, city: 'Minneapolis', state: 'MN' },
];

storiesOf('React Functional Select', module).add('Basic', () => {
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
      <Paragraph>
        In this story's source code, notice that the <Code>onOptionChange</Code>
        , <Code>getOptionValue</Code> and <Code>getOptionLabel</Code> callback
        props are wrapped in a <Code>useCallback</Code>. While not required,{' '}
        <em>strongly prefer </em> memoization of any callback function props 
        whenever possible. This will greatly boost performance and limit re-renders 
        as these props are referenced in the dependency arrays 
        of <Code>useCallbacks</Code> and <Code>useEffects</Code>. When defined in a 
        functional component, wrap in a <Code>useCallback</Code>; when defined in a 
        legacy class component, ensure proper binding to <Code>this</Code>.
      </Paragraph>
      <Paragraph>
        The <Code>options</Code> prop should also be memoized. Either consume it
        directly from a state management store, or make sure it is stable by
        avoiding inline or render-based mutations.
      </Paragraph>
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
              <SelectedCode>{JSON.stringify(selectedOption || {})}</SelectedCode>
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
});