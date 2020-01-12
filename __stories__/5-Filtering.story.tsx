import React, { useCallback, useMemo } from 'react';
import { storiesOf } from '@storybook/react';
import { CityOption } from './helpers/types';
import { Checkbox } from './helpers/components';
import { CITY_OPTIONS } from './helpers/constants';
import { useCallbackState } from './helpers/hooks';
import { Select, FilterMatchEnum, MenuOption } from '../src';
import { Hr, Title, List, ListWrapper, ListItem, SubTitle, Container, SelectContainer, CodeHeader, CheckboxGroup, Card, CardHeader, CardBody } from './helpers/styled';

storiesOf('React Functional Select', module).add('Filtering', () => {
  const options = useMemo<CityOption[]>(() => {
    return [
      ...CITY_OPTIONS,
      { id: 11, city: 'São Paulo', state: 'BR' }
    ];
  }, []);

  const [filterIgnoreCase, setFilterIgnoreCase] = useCallbackState(true);
  const [useCustomFilterFunc, setUseCustomFilterFunc] = useCallbackState(false);
  const [filterIgnoreAccents, setFilterIgnoreAccents] = useCallbackState(false);
  const [filterMatchFromStart, setFilterMatchFromStart] = useCallbackState(false);

  const getOptionValue = useCallback((option: CityOption): number => option.id, []);
  const getOptionLabel = useCallback((option: CityOption): string => `${option.city}, ${option.state}`, []);
  const getFilterOptionString = useCallback((menuOption: MenuOption): string => menuOption.data.state, []);

  return (
    <Container>
      <Title>Filter Customization</Title>
      <Hr />
      <ListWrapper>
        The default filtering functionality can be customized via the following properties:
        <List>
          <ListItem>
            <CodeHeader>filterIgnoreCase?: boolean</CodeHeader> - Filter ignores case
            when matching strings. Default value is <code>true</code>.
          </ListItem>
          <ListItem>
            <CodeHeader>filterIgnoreAccents?: boolean</CodeHeader> - Filter ignores
            accents when matching strings. Default value is <code>false</code>.
          </ListItem>
          <ListItem>
            <CodeHeader>filterMatchFrom?: 'any' | 'start'</CodeHeader> - Position
            in source string to perform match. Default value is <code>'any'</code>.
          </ListItem>
          <ListItem>
            <CodeHeader>getFilterOptionString(option: MenuOption): string</CodeHeader> -
            When defined will take each option and generate a string used in the
            filtering process. By default, the stringified version of what is generated
            by <code>getOptionLabel</code>, if definded, or the option's label as a fallback.
            The <code>MenuOption</code> typed parameter that <code>getFilterOptionString</code> accepts
            contains a <code>data</code> property that represents the objects that comprise
            your <code>options</code> property.
          </ListItem>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <CheckboxGroup>
            <Checkbox
              label='Ignore Case'
              checked={filterIgnoreCase}
              onCheck={setFilterIgnoreCase}
            />
            <Checkbox
              label='Ignore Accents'
              checked={filterIgnoreAccents}
              onCheck={setFilterIgnoreAccents}
            />
            <Checkbox
              label='Match from the start'
              checked={filterMatchFromStart}
              onCheck={setFilterMatchFromStart}
            />
            <Checkbox
              label='Use custom filter function (by state only)'
              checked={useCustomFilterFunc}
              onCheck={setUseCustomFilterFunc}
            />
          </CheckboxGroup>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              isClearable
              options={options}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              filterIgnoreCase={filterIgnoreCase}
              filterIgnoreAccents={filterIgnoreAccents}
              getFilterOptionString={useCustomFilterFunc ? getFilterOptionString : undefined}
              filterMatchFrom={filterMatchFromStart ? FilterMatchEnum.START : FilterMatchEnum.ANY}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
});