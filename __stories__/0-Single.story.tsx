import React, { useEffect, useCallback } from 'react';
import { Select } from '../src';
import { storiesOf } from '@storybook/react';
import { Checkbox } from './helpers/components';
import { CityOption, CITY_OPTIONS } from './helpers/utils';
import { useCallbackState, useClearAllToasts } from './helpers/hooks';
import { Hr, Title, SubTitle, Container, SelectContainer, Paragraph, CheckboxGroup, Card, CardHeader, CardBody } from './helpers/styled';

storiesOf('React Functional Select', module).add('Single-select', () => {
  const [isInvalid, setIsInvalid] = useCallbackState(false);
  const [isLoading, setIsLoading] = useCallbackState(false);
  const [isDisabled, setIsDisabled] = useCallbackState(false);
  const [isClearable, setIsClearable] = useCallbackState(true);
  const [isSearchable, setIsSearchable] = useCallbackState(true);

  const getOptionValue = useCallback((option: CityOption): number => option.id, []);
  const getOptionLabel = useCallback((option: CityOption): string => `${option.city}, ${option.state}`, []);

  useEffect(() => {
    isDisabled && setIsInvalid(false);
  }, [isDisabled]);

  useClearAllToasts();

  return (
    <Container>
      <Title>Single-select</Title>
      <Hr />
      <Paragraph>
        In this story's source code, notice that the callback function
        properties <code>getOptionValue</code> and <code>getOptionLabel</code> are
        wrapped in a <code>useCallback</code>. While not required, <em> strongly prefer </em>
        memoization of any callback function property whenever possible. This will boost
        performance and reduce the amount of renders as these properties are referenced
        in the dependency arrays of <code>useCallbacks</code>, <code>useEffects</code>,
        and <code>useMemos</code>. When defined in a functional component, wrap in
        a <code>useCallback</code>; when defined in a legacy class component, ensure proper
        binding to <code>this</code>. Alternatively, if there is no dependency on any state,
        you can opt to hoist functions outside of the component entirely.
      </Paragraph>
      <Paragraph>
        The <code>options</code> prop should also be memoized. Either consume it
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
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
});