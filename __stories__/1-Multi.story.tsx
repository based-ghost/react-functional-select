import React, { useEffect, useCallback } from 'react';
import { Select } from '../src';
import styled from 'styled-components';
import Checkbox from './helpers/Checkbox';
import { storiesOf } from '@storybook/react';
import { useCallbackState } from './helpers/useCallbackState';
import { Hr, Title, Label, SubTitle, Container, SelectContainer, Paragraph, Code, CheckboxGroup, Card, CardHeader, CardBody } from './helpers/styled';

type CityOption = {
  readonly id: number;
  readonly city: string;
  readonly state: string;
};

const SelectedCode = styled(Code)`
  color: #fff;
  font-weight: 400;
  font-size: 0.875em;
  background-color: #282c34;
`;

const SelectedLabelText = styled.span`
  font-weight: 600;
  margin-right: 0.275rem;
  margin-left: 0 !important;
`;

const _options: CityOption[] = [
  { id: 1, city: 'Austin', state: 'TX' },
  { id: 2, city: 'Denver', state: 'CO' },
  { id: 3, city: 'Chicago', state: 'IL' },
  { id: 4, city: 'Phoenix', state: 'AZ' },
  { id: 5, city: 'Houston', state: 'TX' },
  { id: 6, city: 'Las Vegas', state: 'NV' },
  { id: 7, city: 'Milwaukee', state: 'WI' },
  { id: 8, city: 'Louisville', state: 'KY' },
  { id: 9, city: 'Los Angeles', state: 'CA' },
  { id: 10, city: 'Minneapolis', state: 'MN' },
];

storiesOf('React Functional Select', module).add('Multi', () => {
  const [openMenuOnClick, setOpenMenuOnClick] = useCallbackState(true);
  const [closeMenuOnSelect, setCloseMenuOnSelect] = useCallbackState(true);
  const [blurInputOnSelect, setBlurInputOnSelect] = useCallbackState(false);
  const [hideSelectedOptions, setHideSelectedOptions] = useCallbackState(true);

  const getOptionValue = useCallback((option: CityOption): number => option.id, []);
  const getOptionLabel = useCallback((option: CityOption): string => `${option.city}, ${option.state}`, []);

  return (
    <Container>
      <Title>Multi</Title>
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
              label='Close Menu On Select'
              checked={closeMenuOnSelect}
              onCheck={setCloseMenuOnSelect}
            />
            <Checkbox
              label='Blur Input On Select'
              checked={blurInputOnSelect}
              onCheck={setBlurInputOnSelect}
            />
            <Checkbox
              label='Hide Selected Options'
              checked={hideSelectedOptions}
              onCheck={setHideSelectedOptions}
            />
            <Checkbox
              label='Open Menu On Click (use caret if false)'
              checked={openMenuOnClick}
              onCheck={setOpenMenuOnClick}
            />
          </CheckboxGroup>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              isMulti
              isClearable
              isSearchable
              options={_options}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              openMenuOnClick={openMenuOnClick}
              blurInputOnSelect={blurInputOnSelect}
              closeMenuOnSelect={closeMenuOnSelect}
              hideSelectedOptions={hideSelectedOptions}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
});