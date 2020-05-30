import React, { useCallback, Fragment, ReactNode } from 'react';
import styled from 'styled-components';
import { Select, MultiParams } from '../src';
import { CityOption } from './helpers/types';
import { storiesOf } from '@storybook/react';
import { Checkbox } from './helpers/components';
import { CITY_OPTIONS } from './helpers/constants';
import { useCallbackState } from './helpers/hooks';
import { Hr, Title, SubTitle, List, ListItem, ListWrapper, Container, SelectContainer, TextHeader, CheckboxGroup, Card, CardHeader, CardBody } from './helpers/styled';

const OtherSpan = styled.span`
  opacity: 0.75;
  font-size: 0.75em;
  margin-top: 0.05em;
  margin-left: 0.45em;
`;

storiesOf('React Functional Select', module).add('Multi-select', () => {
  const [openMenuOnClick, setOpenMenuOnClick] = useCallbackState(true);
  const [closeMenuOnSelect, setCloseMenuOnSelect] = useCallbackState(true);
  const [blurInputOnSelect, setBlurInputOnSelect] = useCallbackState(false);
  const [hideSelectedOptions, setHideSelectedOptions] = useCallbackState(true);
  const [useRenderMultiOptions, setUseRenderMultiOptions] = useCallbackState(false);

  const getOptionValue = useCallback((option: CityOption): number => option.id, []);
  const getOptionLabel = useCallback((option: CityOption): string => `${option.city}, ${option.state}`, []);

  // Example "renderMultiOptions" property that can be used to further customize labeling for multi-option scenarios
  const renderMultiOptions = useCallback((params: MultiParams): ReactNode => {
    const { selected, renderOptionLabel } = params;
    const length = selected.length;

    return (
      <Fragment>
        {length && renderOptionLabel(selected[0].data)}
        {(length > 1) && (
          <OtherSpan>
            {`(+${length - 1} ${(length === 2) ? 'other' : 'others'})`}
          </OtherSpan>
        )}
      </Fragment>
    );
  }, []);

  return (
    <Container>
      <Title>Multi-select</Title>
      <Hr />
      <ListWrapper>
        Add the <code>isMulti</code> property to allow for multiple selections.
        While in multi-select mode, some properties are now applicable and
        others become more pertinent.
        <List>
          <ListItem>
            <TextHeader>hideSelectedOptions?: boolean</TextHeader> - Hide the
            selected option from the menu. Default value is false, however, if
            undefined and <code>isMulti === true</code>, then its value defaults
            to true.
          </ListItem>
          <ListItem>
            <TextHeader>closeMenuOnSelect?: boolean</TextHeader> - Close the
            menu of options when the user selects an option. Default value is
            false, however, it may be benefical to set this property to true for
            convenience in multi-select scenarios.
          </ListItem>
          <ListItem>
            <TextHeader>renderMultiOptions(params: MultiParams): ReactNode</TextHeader>
             - Optional callback function that can be used to further customize
            the selection label in multi-select scenarios . <code>params</code>{' '}
            is an object that contains the <code>selected</code> and{' '}
            <code>renderOptionLabel</code> properties (array of selected options
            and function used to render individual option labels, respectively).
            When this function is defined, left and right arrow navigation of
            individual options is disabled. When using this property, it may be
            be a good idea to set the property <code>backspaceClearsValue</code>{' '}
            to <em>false</em> in order to avoid accidentally clearing all
            selections when searching.
          </ListItem>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <CheckboxGroup>
            <Checkbox
              label='closeMenuOnSelect'
              checked={closeMenuOnSelect}
              onCheck={setCloseMenuOnSelect}
            />
            <Checkbox
              label='hideSelectedOptions'
              checked={hideSelectedOptions}
              onCheck={setHideSelectedOptions}
            />
            <Checkbox
              label='blurInputOnSelect'
              checked={blurInputOnSelect}
              onCheck={setBlurInputOnSelect}
            />
            <Checkbox
              label='openMenuOnClick (click caret if false)'
              checked={openMenuOnClick}
              onCheck={setOpenMenuOnClick}
            />
            <Checkbox
              label='renderMultiOptions (custom renderer)'
              checked={useRenderMultiOptions}
              onCheck={setUseRenderMultiOptions}
            />
          </CheckboxGroup>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              isMulti
              isClearable
              isSearchable
              options={CITY_OPTIONS}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
              openMenuOnClick={openMenuOnClick}
              blurInputOnSelect={blurInputOnSelect}
              closeMenuOnSelect={closeMenuOnSelect}
              hideSelectedOptions={hideSelectedOptions}
              backspaceClearsValue={!useRenderMultiOptions}
              renderMultiOptions={useRenderMultiOptions ? renderMultiOptions : undefined}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
});