import React, { useState, useCallback } from 'react';
import { Select } from '../src';
import { Option } from './helpers/types';
import { storiesOf } from '@storybook/react';
import { getRandomInt, mockHttpRequest, createAsyncOptions } from './helpers/utils';
import { Hr, LabelNote, Title, SubTitle, List, ListItem, ListWrapper, Container, SelectContainer, TextHeader, Card, CardHeader, CardBody } from './helpers/styled';

storiesOf('React Functional Select', module).add('Async', () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<Option[]>(() => createAsyncOptions(5, 'Initial'));

  const onInputChange = useCallback((): void => {
    setIsLoading(true);
  }, []);

  const onSearchChange = useCallback((value: string): void => {
    mockHttpRequest(500)
      .then(() => {
        const count = getRandomInt(1, 5);
        const nextOptions = createAsyncOptions(count, `Search text: ${value || 'Initial'}`);
        setOptions(nextOptions);
      })
      .catch((e) => {
        console.error(e);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      <Title>Async Mode</Title>
      <Hr />
      <ListWrapper>
        Add the <code>async</code> property to enable async mode. There is one key difference
        in core functionality with async mode - changes to search input value will not cause
        the <code>useMenuOptions</code> effect to run. The rest of hooking into async mode is
        achieved using some combination of the properties found below
        . <em>Properties <code>onInputChange</code> and <code>onSearchChange</code> should be
        memoized.</em>
        <List>
          <ListItem>
            <TextHeader>onInputChange(value: string): void</TextHeader> -
            callback executed directly following the input control's <code>onChange</code> event.
            This callback is not debounced, so it fires immediately. This is a good
            place to set a stateful loading property in your parent component that is mapped to
            react-functional-select's <code>isLoading</code> property.
          </ListItem>
          <ListItem>
            <TextHeader>onSearchChange(value: string): void</TextHeader> -
            callback executed following component state updates for
            the <code>debouncedInputValue</code>. The debounce is set using
            the <code>inputDelay</code> property. This callback is a good place for your
            http fetch request and post-request logic (i.e. setting isLoading false).
          </ListItem>
          <ListItem>
            <TextHeader>inputDelay?: number</TextHeader> - As mentioned above, this can be
            set to a positive integer in order to debounce updates to the search input value
            following input change events. This property directly maps to the <code>delay</code> in
            milliconds passed to the <code>setTimeout</code> method.
          </ListItem>
          <ListItem>
            <TextHeader>isLoading?: boolean</TextHeader> - When true, a loading animation will
            appear in the far-right of the control and take the place of the clear icon (if shown).
            Additionally, it will hide options in the menu and instead, display a loading message.
            The loading message text defaults to 'Loading...', but can be overriden via
            the <code>loadingMsg</code> property.
          </ListItem>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <LabelNote>Search input debounced 375ms and the mock http call resolves after 500ms</LabelNote>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              async
              isClearable
              inputDelay={375}
              options={options}
              isLoading={isLoading}
              onInputChange={onInputChange}
              onSearchChange={onSearchChange}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
});