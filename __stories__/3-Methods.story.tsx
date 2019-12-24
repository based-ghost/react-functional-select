import React, { useRef } from 'react';
import { Select, SelectRef } from '../src';
import { storiesOf } from '@storybook/react';
import { FIVE_BASIC_OPTIONS } from './helpers/utils';
import { useClearAllToasts } from './helpers/useClearAllToasts';
import { Hr, List, CodeHeader, Code, Title, Button, ListItem, SubTitle, Label, Container, ListWrapper, ButtonGroup, Card, CardHeader, CardBody, SelectContainer } from './helpers/styled';

storiesOf('React Functional Select', module).add('Methods', () => {
  const selectRef = useRef<SelectRef | null>(null);

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
    selectRef.current && selectRef.current.setValue(FIVE_BASIC_OPTIONS[0]);
  };

  useClearAllToasts();

  return (
    <Container>
      <Title>Methods</Title>
      <Hr />
      <ListWrapper>
        Four public methods are exposed to wrapping components and are
        accessible via a forwarded <Code>ref</Code>.
        <List>
          <ListItem>
            <CodeHeader>blur(): void</CodeHeader> - blur the control programatically
          </ListItem>
          <ListItem>
            <CodeHeader>focus(): void</CodeHeader> - focus the control programatically
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
              options={FIVE_BASIC_OPTIONS}
              initialValue={FIVE_BASIC_OPTIONS[0]}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
});