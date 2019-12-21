import React, { useMemo, useCallback, Fragment, FocusEvent, KeyboardEvent } from 'react';
import { Select } from '../src';
import Checkbox from './helpers/Checkbox';
import { storiesOf } from '@storybook/react';
import { useCallbackState } from './helpers/useCallbackState';
import { ToastContainer, ToastPosition } from 'react-toastify';
import { Option, renderInfoToast, renderSuccessToast, createSelectOptions } from './helpers/utils';
import { Hr, Title, List, ListWrapper, ListItem, SubTitle, CheckboxGroup, Container, SelectContainer, Code, CodeFunction, Card, CardHeader, CardBody } from './helpers/styled';

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
    option && renderSuccessToast(`Selected Option: ${JSON.stringify(option)}`);
  }, []);

  return (
    <Fragment>
      <ToastContainer
        newestOnTop
        autoClose={2500}
        draggable={false}
        position={ToastPosition.TOP_RIGHT}
      />
      <Container>
        <Title>Events</Title>
        <Hr />
        <ListWrapper>
          There are various callback properties aside from the most commonly 
          used <Code>onOptionChange</Code>:
          <List>
            <ListItem>
              <CodeFunction>onMenuOpen(...args: any[]): void</CodeFunction> - 
              executed after the menu is opened
            </ListItem>
            <ListItem>
              <CodeFunction>onMenuClose(...args: any[]): void</CodeFunction> - 
              executed after the menu is closed
            </ListItem>
            <ListItem>
              <CodeFunction>onKeyDown(e: KeyboardEvent&lt;HTMLDivElement&gt;): void</CodeFunction> -
              executed after the onKeyDown event
            </ListItem>
            <ListItem>
              <CodeFunction>onInputBlur(e: FocusEvent&lt;HTMLInputElement&gt;): void</CodeFunction> - 
              executed after the input control is blurred
            </ListItem>
            <ListItem>
              <CodeFunction>onInputFocus(e: FocusEvent&lt;HTMLInputElement&gt;): void</CodeFunction> - 
              executed after the input control is focused
            </ListItem>
          </List>
        </ListWrapper>
        <SubTitle>Demo</SubTitle>
        <Hr />
        <Card>
          <CardHeader>
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
    </Fragment>
  );
});