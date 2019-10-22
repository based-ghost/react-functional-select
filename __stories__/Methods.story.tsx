import React, { useRef, useState } from 'react';
import { Select, SelectRef } from '..';
import { storiesOf } from '@storybook/react';
import { Option, createSelectOptions } from './helpers/utils';
import { Hr, List, Code, Title, Button, LabelText, ListItem, SubTitle, Label, Container, ListWrapper, ButtonGroup, Card, CardHeader, CardBody, SelectContainer } from './helpers/styled';

storiesOf('React Functional Select', module).add('Methods', () => {
  const selectRef = useRef<SelectRef | null>(null);
  const [options] = useState<Option[]>(() => createSelectOptions(5));

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
        accessible via <Code>ref</Code>.
        <List>
          <ListItem>
            <Code>blur()</Code> - blur the control programatically
          </ListItem>
          <ListItem>
            <Code>focus()</Code> - focus the control programatically
          </ListItem>
          <ListItem>
            <Code>clearValue()</Code> - clear the current value programatically
            <em> (if an option is selected)</em>
          </ListItem>
          <ListItem>
            <Code>setValue(option?: any)</Code> - set the value programatically
            <em> (option will be validated)</em>
          </ListItem>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader supportMobile>
          <Label>
            <LabelText>Simulate Methods:</LabelText>
          </Label>
          <ButtonGroup>
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