import React, { useEffect, useCallback } from 'react';
import { Select } from '../src';
import styled from 'styled-components';
import Checkbox from './helpers/Checkbox';
import { storiesOf } from '@storybook/react';
import { CityOption, CITY_OPTIONS } from './helpers/utils';
import { useCallbackState } from './helpers/useCallbackState';
import { Hr, Title, Label, SubTitle, Container, SelectContainer, Paragraph, Code, CheckboxGroup, Card, CardHeader, CardBody } from './helpers/styled';

const SelectedCode = styled(Code)`
  margin: 0 2px;
  color: #D8205E;
  font-weight: 400;
  font-size: 0.85em;
  background-color: rgba(27, 31, 35, 0.06);
`;

const SelectedLabelText = styled.span`
  font-weight: 600;
  margin-right: 0.275rem;
  margin-left: 0 !important;
`;

storiesOf('React Functional Select', module).add('Single-select', () => {
  const [isInvalid, setIsInvalid] = useCallbackState(false);
  const [isLoading, setIsLoading] = useCallbackState(false);
  const [isDisabled, setIsDisabled] = useCallbackState(false);
  const [isClearable, setIsClearable] = useCallbackState(true);
  const [isSearchable, setIsSearchable] = useCallbackState(true);
  const [selectedOption, setSelectedOption] = useCallbackState<CityOption | null>(null);
  
  const getOptionValue = useCallback((option: CityOption): number => option.id, []);
  const getOptionLabel = useCallback((option: CityOption): string => `${option.city}, ${option.state}`, []);

  useEffect(() => {
    isDisabled && setIsInvalid(false);
  }, [isDisabled]);

  return (
    <Container>
      <Title>Single-select</Title>
      <Hr />
      <Paragraph>
        In this story's source code, notice that the <Code>onOptionChange</Code>
        , <Code>getOptionValue</Code> and <Code>getOptionLabel</Code> callback
        props are wrapped in a <Code>useCallback</Code>. While not required,
        <em> strongly prefer </em> memoization of any callback function props 
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
              <SelectedLabelText>Selected Option:</SelectedLabelText>
              <SelectedCode>{JSON.stringify(selectedOption || {})}</SelectedCode>
            </Label>
          </CheckboxGroup>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              isLoading={isLoading}
              isInvalid={isInvalid}
              options={CITY_OPTIONS}
              isDisabled={isDisabled}
              isClearable={isClearable}
              isSearchable={isSearchable}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              onOptionChange={setSelectedOption}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
});