import React, { useCallback } from 'react';
import { Select } from '..';
import { storiesOf } from '@storybook/react';
import styled, { css, keyframes } from 'styled-components';
const reactLogo = require('./assets/react_logo.svg') as string;
import { Hr, Title, List, ListItem, ListWrapper, SubTitle, Container, SelectContainer, Label, LabelText, Code, Card, CardHeader, CardBody } from './helpers/styled';

type StyledImageProps = {
  readonly isDisabled: boolean;
};

type PackageOption = {
  readonly id: number;
  readonly packageName: string;
};

const _themeConfig: any = {
  menu: {
    option: {
      selectedColor: '#515151',
      focusedBgColor: '#f5f5f5',
      selectedBgColor: '#f5f5f5',
    }
  }
};

const _spinLogo = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

const _spinLogoAnimation = css`
  animation: ${_spinLogo} infinite 8s linear;
`;

const StyledDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const StyledSpan = styled.span`
  color: #515151;
  font-size: 1em;
  font-weight: 600;
  margin-left: 2px;
  margin-bottom: 3px;
  letter-spacing: .01em;
`;

const StyledImg = styled.img<StyledImageProps>`
  height: 30px;
  border-style: none;
  display: inline-block;
  ${({ isDisabled }) => (!isDisabled &&  _spinLogoAnimation)}
`;

const _options: PackageOption[] = [
  { id: 1, packageName: 'react' },
  { id: 2, packageName: 'react-dom' },
  { id: 3, packageName: 'reactstrap' },
  { id: 4, packageName: 'react-scripts' },
  { id: 5, packageName: 'react-window' },
];

storiesOf('React Functional Select', module).add('Complex', () => {
  const getOptionValue = useCallback((option: PackageOption): number => {
    return option.id;
  }, []);

  const getIsOptionDisabled = useCallback((option: PackageOption): boolean => {
    return (option.packageName === _options[3].packageName);
  }, []);

  const renderOptionLabel = useCallback((option: PackageOption): JSX.Element => {
    const isDisabled = getIsOptionDisabled(option);
    return (
      <StyledDiv>
        <StyledImg src={reactLogo} isDisabled={isDisabled} />
        <StyledSpan>{option.packageName}</StyledSpan>
      </StyledDiv>
    );
  }, [getIsOptionDisabled]);

  return (
    <Container>
      <Title>Complex Properties</Title>
      <Hr />
      <ListWrapper>
        Implementation using a couple of the more specialized properties.
        <List>
          <ListItem>
            <Code>renderOptionLabel(option)</Code><em> => ReactNode</em> - Callback function 
            with a return type of <em>ReactNode</em>. Use this property in cases where the 
            standard <Code>getOptionLabel</Code> property won't meet your needs (for instance, 
            you want to render each option's label using custom <Code>JSX</Code>).
          </ListItem>
          <ListItem>
            <Code>getIsOptionDisabled(option)</Code><em> => Boolean</em> - Callback function 
            with a return type of <em>Boolean</em>. When it evaluates to a value of <em>true</em>, 
            that option iteration will be rendered <em>disabled</em>. As an alternative, you can 
            also pass a property of <em>isDisabled</em> with each option. Use of these two options - 
            they cannot both be specified.
          </ListItem>
        </List>
      </ListWrapper>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <Label>
            <LabelText>JSX labels &amp; disabled option</LabelText>
          </Label>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              options={_options}
              isSearchable={false}
              themeConfig={_themeConfig}
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