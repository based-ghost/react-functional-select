import React, { useRef, useEffect, useState } from 'react';
import { Select, SelectRef } from '../src';
import { storiesOf } from '@storybook/react';
import { Option, createSelectOptions } from './helpers/utils';
import OptionsCountButton from './helpers/OptionsCountButton';
import { useClearAllToasts } from './helpers/useClearAllToasts';
import PackageLink, { PackageLinkProps } from './helpers/PackageLink';
import { Hr, Title, SubTitle, List, ListWrapper, ListItem, Label, Container, Code, ButtonGroup, Card, CardHeader, CardBody, SelectContainer } from './helpers/styled';

const _reactWindowLink = Object.freeze<PackageLinkProps>({
  name: 'react-window',
  href: 'https://github.com/bvaughn/react-window',
});

storiesOf('React Functional Select', module).add('Windowing', () => {
  const selectRef = useRef<SelectRef | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [optionsCount, setOptionsCount] = useState<number>(100);

  useEffect(() => {
    const handler = setTimeout(() => {
      setOptions(createSelectOptions(optionsCount));
    }, 120);

    return () => {
      clearTimeout(handler);
    };
  }, [optionsCount]);

  useEffect(() => {
    selectRef.current && selectRef.current.clearValue();
  }, [options]);

  useClearAllToasts();

  return (
    <Container>
      <Title>Integrated Windowing</Title>
      <Hr />
      <ListWrapper>
        Option data is 'windowed' using the <PackageLink {..._reactWindowLink} /> package. 
        Aside from the obvious benefits provided by only rendering a small subset of your 
        enumerable data (rather than bloating the DOM with an excessive amount of nodes),
        'windowing' can also assist with:
        <List>
          <ListItem>
            <strong>Efficient memory allocation</strong>. 'Windowing' naturally
            lends itself to the dynamic generation of attributes/values as each
            object comes into your renderer's scope (as opposed to allocating
            this data upfront for each object in your list). This way you can
            perform this work just when you absolutely need to and then can
            immediately release it for the GC to cleanup. As an example I am
            generating the <Code>onClick</Code>, <Code>id</Code>, 
            and <Code>className</Code> attributes for each <Code>menuOption</Code> as 
            they get passed to the <Code>&lt;Option /&gt;</Code> renderer component.
          </ListItem>
          <ListItem>
            <strong>Functional architecture</strong>. The flexibility provided
            through only having to manage subsets of your list allows for a more
            dynamic application. By breaking your code out into smaller, 'pure'
            child components, you can write code that scales well and becomes
            open to performance optimizations - most notably, memoization.
            Simple components that rely on the props passed to it (rather than
            its own managed state) to generate its JSX are likely candidates for
            memoization (testing &amp; debugging becomes much easier as well).
          </ListItem>
        </List>
        <em>Note: </em>The only time any noticeable performance degradation will be observed 
        is during search input updates when the <Code>options</Code> count reaches the high 
        tens of thousands. To work around this, the <Code>inputDelay</Code> (number in milliseconds) 
        can be set to debounce the input value. That way, the <Code>menuOptions</Code> will not be 
        recalculated on every keystroke.
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader supportMobile>
          <ButtonGroup>
            <Label>Load Testing Tiers</Label>
            <OptionsCountButton
              count={100}
              optionsCount={optionsCount}
              setOptionsCount={setOptionsCount}
            />
            <OptionsCountButton
              count={1000}
              optionsCount={optionsCount}
              setOptionsCount={setOptionsCount}
            />
            <OptionsCountButton
              count={5000}
              optionsCount={optionsCount}
              setOptionsCount={setOptionsCount}
            />
            <OptionsCountButton
              count={25000}
              optionsCount={optionsCount}
              setOptionsCount={setOptionsCount}
            />
          </ButtonGroup>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              ref={selectRef}
              options={options}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
});