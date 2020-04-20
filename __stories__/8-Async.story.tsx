import React, { useState, useCallback } from 'react';
import { Select } from '../src';
import { Option } from './helpers/types';
import { storiesOf } from '@storybook/react';
import { mockHttpRequest, createAsyncOptions } from './helpers/utils';
import { Hr, LabelNote, Title, SubTitle, List, ListItem, ListWrapper, Container, SelectContainer, TextHeader, Card, CardHeader, CardBody } from './helpers/styled';

storiesOf('React Functional Select', module).add('Async', () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<Option[]>(() => createAsyncOptions(3, 'Initial'));

  const onInputChange = useCallback((): void => {
    setIsLoading(true);
  }, []);

  const onSearchChange = useCallback((value: string): void => {
    mockHttpRequest().then(() => {
      const nextOptions = createAsyncOptions(3, `Search text: ${value || `''`}`);
      setOptions(nextOptions);
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
        the <code>useMenuOptions</code> effect to run (it will just wait for updates to
        the <code>options</code> property). The rest of hooking into async mode is achieved
        using some combination of the properties found below. <em>For callback function
        properties, strongly prefer memoization, as you could encounter some unintended behaviors.</em>
        <List>
          <ListItem>
            <TextHeader>onInputChange(value: string): void</TextHeader> -
            callback executed directly following the input control's <code>onChange</code> event.
            This callback is not in linked to the debounced value, so it fires immediately. This is a
            place to set a stateful loading property in your parent component that is mapped to
            react-functional-select's <code>isLoading</code> property.
          </ListItem>
          <ListItem>
            <TextHeader>onSearchChange(value: string): void</TextHeader> -
            callback executed following component state updates for stateful
            value <code>debouncedInputValue</code>. The debounced delay controlled by
            the <code>inputDelay</code> property. This is most likely where your http fetch
            request and post-request logic (i.e. setting isLoading false) would go.
          </ListItem>
          <ListItem>
            <TextHeader>inputDelay?: number</TextHeader> - As mentioned above, this can be
            set to a positive integer in order to debounce updates to the search input value following
            input change events. This property directly maps to the <code>delay</code> in milliconds
            passed to the <code>setTimeout</code> method.
          </ListItem>
          <ListItem>
            <TextHeader>isLoading?: boolean</TextHeader> - When true, a loading animation will appear
            in the far-right of the control and take the place of the clear icon (if shown). Additionally,
            it will hide options in the menu and instead, display a loading message. The loading message
            text defaults to 'Loading...', but can be overriden via the <code>loadingMsg</code> property.
          </ListItem>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <LabelNote>
            *The search input change event is debounced using a delay of 375ms and the simulated http call resolves after 1000ms.
          </LabelNote>
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