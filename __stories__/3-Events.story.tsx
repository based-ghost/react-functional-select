import React, { useCallback, useMemo, FocusEvent, KeyboardEvent } from 'react';
import { Select } from '../src';
import { Option } from './helpers/types';
import { storiesOf } from '@storybook/react';
import { Checkbox } from './helpers/components';
import { renderInfoToast, createSelectOptions } from './helpers/utils';
import { useCallbackState, useClearToastsOnUnmount } from './helpers/hooks';
import { Hr, LabelNote, Title, List, ListWrapper, ListItem, SubTitle, CheckboxGroup, Container, SelectContainer, CodeHeader, Card, CardHeader, CardBody } from './helpers/styled';

storiesOf('React Functional Select', module).add('Events', () => {
  const options = useMemo<Option[]>(() => createSelectOptions(5), []);

  const [addOnKeyDown, setAddOnKeyDown] = useCallbackState(false);
  const [addOnMenuOpen, setAddOnMenuOpen] = useCallbackState(true);
  const [addOnMenuClose, setAddOnMenuClose] = useCallbackState(false);
  const [addOnInputBlur, setAddOnInputBlur] = useCallbackState(false);
  const [addOnInputFocus, setAddOnInputFocus] = useCallbackState(false);
  const [addOnOptionChange, setAddOnOptionChange] = useCallbackState(true);

  const onMenuOpen = useCallback((...args: any[]): void => renderInfoToast('Menu opened !'), []);
  const onMenuClose = useCallback((...args: any[]): void => renderInfoToast('Menu closed !'), []);
  const onInputBlur = useCallback((e: FocusEvent<HTMLInputElement>): void => renderInfoToast('Control blurred !'), []);
  const onInputFocus = useCallback((e: FocusEvent<HTMLInputElement>): void => renderInfoToast('Control focused !'), []);
  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>): void => renderInfoToast('keydown event executed !'), []);

  const onOptionChange = useCallback((option: Option | null): void => {
    const optionJsonStr = JSON.stringify(option || {}).replace(/"/g, "'");
    renderInfoToast(`Selected Option: ${optionJsonStr}`);
  }, []);

  useClearToastsOnUnmount();

  return (
    <Container>
      <Title>Events</Title>
      <Hr />
      <ListWrapper>
        There are various callback function properties that are executed following
        their associated events:
        <List>
          <ListItem>
            <CodeHeader>onOptionChange(data: any): void</CodeHeader> -
            executed after an option is selected or removed
          </ListItem>
          <ListItem>
            <CodeHeader>onMenuOpen(...args: any[]): void</CodeHeader> -
            executed after the menu is opened
          </ListItem>
          <ListItem>
            <CodeHeader>onMenuClose(...args: any[]): void</CodeHeader> -
            executed after the menu is closed
          </ListItem>
          <ListItem>
            <CodeHeader>onKeyDown(e: KeyboardEvent&lt;HTMLDivElement&gt;): void</CodeHeader> -
            executed after the onKeyDown event
          </ListItem>
          <ListItem>
            <CodeHeader>onInputBlur(e: FocusEvent&lt;HTMLInputElement&gt;): void</CodeHeader> -
            executed after the input control is blurred
          </ListItem>
          <ListItem>
            <CodeHeader>onInputFocus(e: FocusEvent&lt;HTMLInputElement&gt;): void</CodeHeader> -
            executed after the input control is focused
          </ListItem>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <LabelNote>*For demo purposes, events trigger a notification when executed</LabelNote>
          <CheckboxGroup>
            <Checkbox
              label='onOptionChange'
              checked={addOnOptionChange}
              onCheck={setAddOnOptionChange}
            />
            <Checkbox
              label='onMenuOpen'
              checked={addOnMenuOpen}
              onCheck={setAddOnMenuOpen}
            />
            <Checkbox
              label='onMenuClose'
              checked={addOnMenuClose}
              onCheck={setAddOnMenuClose}
            />
            <Checkbox
              label='onInputBlur'
              checked={addOnInputBlur}
              onCheck={setAddOnInputBlur}
            />
            <Checkbox
              label='onInputFocus'
              checked={addOnInputFocus}
              onCheck={setAddOnInputFocus}
            />
            <Checkbox
              label='onKeyDown'
              checked={addOnKeyDown}
              onCheck={setAddOnKeyDown}
            />
          </CheckboxGroup>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              options={options}
              onKeyDown={addOnKeyDown ? onKeyDown : undefined}
              onMenuOpen={addOnMenuOpen ? onMenuOpen : undefined}
              onMenuClose={addOnMenuClose ? onMenuClose : undefined}
              onInputBlur={addOnInputBlur ? onInputBlur : undefined}
              onInputFocus={addOnInputFocus ? onInputFocus : undefined}
              onOptionChange={addOnOptionChange ? onOptionChange : undefined}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
});