import React, { useMemo, useRef } from 'react';
import { Select, SelectRef } from '../src';
import { storiesOf } from '@storybook/react';
import { useClearAllToasts } from './helpers/hooks';
import { createSelectOptions, Option } from './helpers/utils';
import { Hr, List, CodeHeader, Title, Button, Label, ListItem, SubTitle, Container, ListWrapper, ButtonGroup, Card, CardHeader, CardBody, SelectContainer } from './helpers/styled';

storiesOf('React Functional Select', module).add('Methods', () => {
  const selectRef = useRef<SelectRef | null>(null);
  const options = useMemo<Option[]>(() => createSelectOptions(5), []);

  const blurSelect = (): void => {
    selectRef.current && selectRef.current.blur();
  };

  const focusSelect = (): void => {
    selectRef.current && selectRef.current.focus();
  };

  const clearValue = (): void => {
    selectRef.current && selectRef.current.clearValue();
  };

  const toggleMenuOpen = (): void => {
    selectRef.current && selectRef.current.toggleMenu(true);
  };

  const updateSelectedOption = (): void => {
    selectRef.current && selectRef.current.setValue(options[0]);
  };

  useClearAllToasts();

  return (
    <Container>
      <Title>Methods</Title>
      <Hr />
      <ListWrapper>
        Five public methods are exposed to wrapping components and are
        accessible via a forwarded <code>ref</code>.
        <List>
          <ListItem>
            <CodeHeader>blur(): void</CodeHeader> - blur the control programatically
          </ListItem>
          <ListItem>
            <CodeHeader>focus(): void</CodeHeader> - focus the control programatically
          </ListItem>
          <ListItem>
            <CodeHeader>toggleMenu(state?: boolean): void</CodeHeader> - toggle the menu programatically
          </ListItem>
          <ListItem>
            <CodeHeader>clearValue(): void</CodeHeader> - clear the current value programatically
            <em> (if an option is selected)</em>
          </ListItem>
          <ListItem>
            <CodeHeader>setValue(option?: any): void</CodeHeader> - set the value programatically
            <em> (option will be validated)</em>
          </ListItem>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader supportMobile>
          <ButtonGroup>
            <Label>Methods</Label>
            <Button onClick={focusSelect}>Focus</Button>
            <Button onClick={blurSelect}>Blur</Button>
            <Button onClick={toggleMenuOpen}>Open Menu</Button>
            <Button onClick={clearValue}>Clear Value</Button>
            <Button onClick={updateSelectedOption}>Set Value (1st Option)</Button>
          </ButtonGroup>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              ref={selectRef}
              options={options}
              initialValue={options[0]}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
});