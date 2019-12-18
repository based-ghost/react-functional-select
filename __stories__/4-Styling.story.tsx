import React, { useEffect, useState, ReactText } from 'react';
import { Select, Theme } from '../src';
import { Option } from './helpers/utils';
import DefaultThemeObj from '../src/theme';
import { storiesOf } from '@storybook/react';
import PrettyPrintJson from './helpers/PrettyPrintJson';
import { useCallbackState } from './helpers/useCallbackState';
import PackageLink, { PackageLinkProps } from './helpers/PackageLink';
import { Hr, Code, Title, SubTitle, Spacer, Paragraph, JsonContainer, LabelText, Label, Container, Card, CardHeader, CardBody, SelectContainer } from './helpers/styled';

const _themeEnum = Object.freeze<{ [key: string]: string }>({
  DEFAULT: 'Default',
  LARGE_TEXT: 'Large Text',
  DARK_COLORS: 'Dark Colors',
  ZERO_BORDER_RADIUS: 'No Border-Radius',
});

const _styledComponentsLink = Object.freeze<PackageLinkProps>({
  name: 'styled-components',
  href: 'https://www.styled-components.com',
});

const _themeConfigMap = Object.freeze<{ [key: string]: any }>({
  [_themeEnum.DEFAULT]: undefined,
  [_themeEnum.DARK_COLORS]: {
    color: {
      border: '#A8AEB4',
      textColor: '#000',
      primary: '#555555',
    },
    control: {
      boxShadowColor: 'rgba(85, 85, 85, 0.25)',
      focusedBorderColor: 'rgba(85, 85, 85, 0.75)',
    },
    icon: {
      color: '#A6A6A6',
    },
    menu: {
      option: {
        selectedColor: '#fff',
        selectedBgColor: '#555555',
        focusedBgColor: 'rgba(85, 85, 85, 0.225)',
      }
    }
  },
  [_themeEnum.LARGE_TEXT]: {
    select: {
      fontSize: '1.25rem',
    },
  },
  [_themeEnum.ZERO_BORDER_RADIUS]: {
    control: {
      borderRadius: '0',
    },
    menu: {
      borderRadius: '0',
    },
  },
});

storiesOf('React Functional Select', module).add('Styling', () => {
  const [themeConfig, setThemeConfig] = useState<Theme | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useCallbackState<Option | null>(null);

  // Create theme options based upon key-value pairs in _themeEnum object defined above
  const [options] = useState<Option[]>(() => {
    const results: Option[] = [];
    Object.keys(_themeEnum).forEach((key: string): void => {
      const themeEnumKey: ReactText = _themeEnum[key];
      results.push({
        value: themeEnumKey,
        label: themeEnumKey
      });
    });
    return results;
  });

  // Adjust the react-window itemSize (height of menu option) from default of 35 to 44 for 'Large Text'
  const menuItemSize = (selectedOption && selectedOption.value === _themeEnum.LARGE_TEXT) ? 44 : 35;

  useEffect(() => {
    if (selectedOption) {
      const mappedThemeConfig = _themeConfigMap[selectedOption.value];
      setThemeConfig(mappedThemeConfig);
    }
  }, [selectedOption]);

  return (
    <Container>
      <Title>Styling</Title>
      <Hr />
      <SubTitle>Theming</SubTitle>
      <Paragraph>
        react-functional-select uses <PackageLink {..._styledComponentsLink} /> to handle its styling. 
        The root node is wrapped in styled-component's <Code>&lt;ThemeProvider /&gt;</Code> wrapper 
        component which gives all child styled-components access to the provided theme via React's 
        context API. To override react-functional-select's default theme, pass an object to
        the <Code>themeConfig</Code> prop - any matching properties will replace those in the 
        default theme.
      </Paragraph>
      <JsonContainer>
        <PrettyPrintJson
          header='Default Theme'
          data={DefaultThemeObj}
        />
      </JsonContainer>
      <SubTitle>Using classNames</SubTitle>
      <Paragraph>
        If you want to style the component using CSS classes, set the <Code>addClassNames</Code> prop 
        to true and it will then generate <Code>className</Code> attributes for that specific instance 
        of the component. These are the classNames that are available for targeting: rfs-select-container, 
        rfs-control-container, rfs-menu-container, rfs-autosize-input, rfs-caret-icon, rfs-clear-icon, rfs-option.
      </Paragraph>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <Label>
            <LabelText>Select themes below..</LabelText>
          </Label>
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              options={options}
              isClearable={false}
              isSearchable={false}
              themeConfig={themeConfig}
              initialValue={options[0]}
              menuItemSize={menuItemSize}
              onOptionChange={setSelectedOption}
            />
            <Spacer />
            <PrettyPrintJson
              data={themeConfig}
              header='Theme Config'
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
});