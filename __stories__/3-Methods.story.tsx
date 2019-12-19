import React, { useRef, useMemo } from 'react';
import { Select, SelectRef } from '../src';
import { storiesOf } from '@storybook/react';
import { Option, createSelectOptions } from './helpers/utils';
import { Hr, List, CodeFunction, Code, Title, Button, ListItem, SubTitle, Label, Container, ListWrapper, ButtonGroup, Card, CardHeader, CardBody, SelectContainer } from './helpers/styled';

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

  const updateSelectedOption = (): void => {
    selectRef.current && selectRef.current.setValue(options[0]);
  };

  return (
    <Container>
      <Title>Methods</Title>
      <Hr />
      <ListWrapper>
        Four public methods are exposed to wrapping components and are
        accessible via a forwarded <Code>ref</Code>.
        <List>
          <ListItem>
            <CodeFunction>blur(): void</CodeFunction> - blur the control programatically
          </ListItem>
          <ListItem>
            <CodeFunction>focus(): void</CodeFunction> - focus the control programatically
          </ListItem>
          <ListItem>
            <CodeFunction>clearValue(): void</CodeFunction> - clear the current value programatically
            <em> (if an option is selected)</em>
          </ListItem>
          <ListItem>
            <CodeFunction>setValue(option?: any): void</CodeFunction> - set the value programatically
            <em> (option will be validated)</em>
          </ListItem>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader supportMobile>
          <ButtonGroup>
            <Label>Simulate Methods</Label>
            <Button onClick={focusSelect}>Focus</Button>
            <Button onClick={blurSelect}>Blur</Button>
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