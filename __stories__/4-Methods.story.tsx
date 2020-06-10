import React, { useMemo, useRef } from 'react';
import { Option } from './helpers/types';
import { Select, SelectRef } from '../src';
import { storiesOf } from '@storybook/react';
import { createSelectOptions } from './helpers/utils';
import { Hr, List, TextHeader, Title, Button, Label, ListItem, SubTitle, Container, ListWrapper, ButtonGroup, Card, CardHeader, CardBody, SelectContainer } from './helpers/styled';

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

  return (
    <Container>
      <Title>Methods</Title>
      <Hr />
      <ListWrapper>
        Five public methods are exposed to wrapping components and are
        accessible via a forwarded <code>ref</code>.
        <List>
          <ListItem>
            <TextHeader>blur(): void</TextHeader> - blur the control
            programatically
          </ListItem>
          <ListItem>
            <TextHeader>focus(): void</TextHeader> - focus the control
            programatically
          </ListItem>
          <ListItem>
            <TextHeader>toggleMenu(state?: boolean): void</TextHeader> - toggle
            the menu programatically
          </ListItem>
          <ListItem>
            <TextHeader>clearValue(): void</TextHeader> - clear the current
            value programatically <em>(if an option is selected)</em>
          </ListItem>
          <ListItem>
            <TextHeader>setValue(option?: any): void</TextHeader> - set the
            value programatically <em>(option will be validated)</em>
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