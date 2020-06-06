import React, { useCallback, ReactNode } from 'react';
import { Select } from '../src';
import { storiesOf } from '@storybook/react';
import { PackageOption } from './helpers/types';
import { PACKAGE_OPTIONS } from './helpers/constants';
import styled, { css, keyframes } from 'styled-components';
import { Hr, Title, List, ListItem, ListWrapper, SubTitle, Container, SelectContainer, LabelHeader, TextHeader, Card, CardHeader, CardBody } from './helpers/styled';

const THEME_CONFIG = {
  menu: {
    option: {
      selectedColor: '#515151',
      focusedBgColor: '#F5F5F5',
      selectedBgColor: '#F5F5F5'
    }
  }
};

const SPIN_LOGO = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

const REACT_LOGO_SVG = require('./assets/react-logo.svg') as string;
const SPIN_ANIMATION_CSS = css`animation: ${SPIN_LOGO} infinite 8s linear;`;

const OptionContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const OptionName = styled.span`
  color: #515151;
  font-size: 1em;
  font-weight: 600;
  margin-left: 2px;
  margin-bottom: 1px;
  letter-spacing: .01em;
`;

const OptionImg = styled.img<{ isDisabled?: boolean }>`
  height: 30px;
  border-style: none;
  display: inline-block;
  ${({ isDisabled }) => (!isDisabled && SPIN_ANIMATION_CSS)}
`;

const ChevronDownSVG = styled.svg<{ menuOpen: boolean }>`
  width: 14px;
  height: 15px;
  fill: currentColor;
  transition: transform 0.25s ease-in-out;
  ${({ menuOpen }) => menuOpen && 'transform: rotate(180deg);'}
`;

storiesOf('React Functional Select', module).add('Advanced Customization', () => {
  const getOptionValue = useCallback((option: PackageOption): number => option.id, []);
  const getIsOptionDisabled = useCallback((option: PackageOption): boolean => (option.name === PACKAGE_OPTIONS[3].name), []);

  const renderOptionLabel = useCallback(
    (option: PackageOption): ReactNode => (
      <OptionContainer>
        <OptionImg
          src={REACT_LOGO_SVG}
          isDisabled={getIsOptionDisabled(option)}
        />
        <OptionName>{option.name}</OptionName>
      </OptionContainer>
    ),
    [getIsOptionDisabled]
  );

  const customCaretIcon = useCallback(
    ({ menuOpen }): ReactNode => (
      <ChevronDownSVG
        aria-hidden='true'
        menuOpen={menuOpen}
        viewBox='0 0 448 512'
      >
        <path d='M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z' />
      </ChevronDownSVG>
    ),
    []
  );

  return (
    <Container>
      <Title>Advanced Customization</Title>
      <Hr />
      <ListWrapper>
        Implementation using a couple of the more specialized properties.
        <List>
          <ListItem>
            <TextHeader>renderOptionLabel(option: any): React.ReactNode</TextHeader> - Callback
            function with a return type of <code>ReactNode</code>. Use this property in cases
            where the standard <code>getOptionLabel</code> property won't meet your needs (for
            instance, you want to render each option's label using custom JSX). More complex
            option labels will likely equate to longer render durations - this can translate
            into a flash of empty space when a user first starts scrolling. In order to prevent
            this, the <code>menuOverscanCount</code> property can be increased to render additional
            rows outside of the visible area. The default value for this property is 1 and it is
            important to note that increasing this value can negatively impact performance.
          </ListItem>
          <ListItem>
            <TextHeader>getIsOptionDisabled(option: any): boolean</TextHeader> - Callback
            function with a return type of <code>Boolean</code>. When it evaluates to a value of
            true, that option iteration will be rendered <em>disabled</em>. As an alternative, you
            can also pass a property of <code>isDisabled</code> with each option. Use of these two
            options - they cannot both be specified.
          </ListItem>
          <ListItem>
            <TextHeader>caretIcon: ReactNode | (...args: any[]) => ReactNode</TextHeader> - A custom
            node or a function that returns a node can used for the <code>caretIcon</code> property.
            When using a function, an object containing stateful data is forwarded and can be used to style
            your custom node accordingly. The state is <code>{'{ menuOpen, isLoading, isInvalid, isDisabled }'}</code> of
            type <code>{'Record<string, boolean>'}</code>. The <code>clearIcon</code> property has an identical definition.
          </ListItem>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <LabelHeader>JSX labels, custom caret icon, and disabled option</LabelHeader>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              isSearchable={false}
              options={PACKAGE_OPTIONS}
              themeConfig={THEME_CONFIG}
              caretIcon={customCaretIcon}
              getOptionValue={getOptionValue}
              renderOptionLabel={renderOptionLabel}
              getIsOptionDisabled={getIsOptionDisabled}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
});