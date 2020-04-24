import React, { useEffect, useMemo, useState, ReactNode } from 'react';
import { Select, Theme } from '../src';
import { Option } from './helpers/types';
import { mergeDeep } from '../src/utils';
import DefaultThemeObj from '../src/theme';
import { storiesOf } from '@storybook/react';
import { useCallbackState } from './helpers/hooks';
import { CodeMarkup, PackageLink } from './helpers/components';
import { createThemeOptions, stringifyJavascriptObj } from './helpers/utils';
import { CLASS_NAME_HTML, STYLED_COMPONENTS_PACKAGE } from './helpers/constants';
import { Hr, Columns, Column, Title, SubTitle, ListWrapper, List, ListItem, Content, LabelHeader, Container, Card, CardHeader, CardBody } from './helpers/styled';
import {
  OPTION_CLS,
  OPTION_FOCUSED_CLS,
  OPTION_DISABLED_CLS,
  OPTION_SELECTED_CLS,
  CARET_ICON_CLS,
  CLEAR_ICON_CLS,
  LOADING_DOTS_CLS,
  AUTOSIZE_INPUT_CLS,
  MENU_CONTAINER_CLS,
  SELECT_CONTAINER_CLS,
  CONTROL_CONTAINER_CLS
} from '../src/constants/dom';

  // Normalize animation props as be default they are type of styled-component's "FlattenSimpleInterpolation"
const BOUNCE_KEYFRAMES = 'BOUNCE_KEYFRAMES 1.19s ease-in-out infinite';
const FADE_IN_KEYFRAMES = 'FADE_IN_KEYFRAMES 0.225s ease-in-out forwards';

const KEYFRAMES_SOURCE_OBJ = {
  loader: {
    animation: BOUNCE_KEYFRAMES
  },
  menu: {
    animation: FADE_IN_KEYFRAMES
  },
  multiValue: {
    animation: FADE_IN_KEYFRAMES
  },
  icon: {
    clear: {
      animation: FADE_IN_KEYFRAMES
    }
  }
};

const ThemeEnum = Object.freeze({
  DEFAULT: 'Default',
  LARGE_TEXT: 'Large text',
  DARK_COLORS: 'Dark colors',
  ZERO_BORDER_RADIUS: 'No border-radius'
});

const ThemeConfigMap = Object.freeze<{[key: string]: any}>({
  [ThemeEnum.DEFAULT]: undefined,
  [ThemeEnum.DARK_COLORS]: {
    color: {
      border: '#A8AEB4',
      primary: '#555555'
    },
    select: {
      css: 'color: #000;'
    },
    control: {
      boxShadowColor: 'rgba(85, 85, 85, 0.25)',
      focusedBorderColor: 'rgba(85, 85, 85, 0.75)'
    },
    icon: {
      color: '#A6A6A6'
    },
    menu: {
      option: {
        selectedColor: '#fff',
        selectedBgColor: '#555555',
        focusedBgColor: 'rgba(85, 85, 85, 0.225)'
      }
    }
  },
  [ThemeEnum.LARGE_TEXT]: {
    select: {
      css: 'font-size: 1.25rem;'
    }
  },
  [ThemeEnum.ZERO_BORDER_RADIUS]: {
    control: {
      borderRadius: '0'
    },
    menu: {
      borderRadius: '0'
    }
  }
});

const SELECT_CONTAINER_STYLE = {
  marginTop: '1rem'
};

const OPTIONS = createThemeOptions(ThemeEnum);
const THEME_DEFAULTS = mergeDeep(DefaultThemeObj, KEYFRAMES_SOURCE_OBJ);

storiesOf('React Functional Select', module).add('Styling', () => {
  const [themeConfig, setThemeConfig] = useState<Theme | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useCallbackState<Option | null>(null);
  const menuItemSize = (selectedOption && selectedOption.value === ThemeEnum.LARGE_TEXT) ? 44 : 35;

  const memoizedMarkupNode = useMemo<ReactNode>(() => (
    <CodeMarkup
      language='markup'
      header='Class Markup'
      data={CLASS_NAME_HTML}
    />
  ), []);

  useEffect(() => {
    if (selectedOption) {
      const { value } = selectedOption;
      const _themeConfig = ThemeConfigMap[value];
      setThemeConfig(_themeConfig);
    }
  }, [selectedOption]);

  return (
    <Container>
      <Title>Styling</Title>
      <Hr />
      <SubTitle>Theming</SubTitle>
      <Columns>
        <Column widthPercent={40}>
          <Content>
            react-functional-select uses{' '}
            <PackageLink packageInfo={STYLED_COMPONENTS_PACKAGE} /> to handle its
            styling.  The root node is wrapped in styled-component's{' '}
            <code>ThemeProvider</code> wrapper component which gives all child
            styled-components access to the provided theme via React's context
            API. To override react-functional-select's default theme, pass an
            object to the <code>themeConfig</code> property - any matching
            properties will replace those in the default theme.
          </Content>
          <Content>
            Starting in <strong>v2.0.0</strong>, some of the nested objects in the{' '}
            <code>themeConfig</code> object contain a <code>css</code>{' '}
            property of type <code>string</code> |{' '}
            <code>FlattenSimpleInterpolation</code> | <code>undefined</code>{' '}
            (default value is undefined). This property can be used to pass raw
            CSS styles as a string or wrapped in{' '}
            <PackageLink packageInfo={STYLED_COMPONENTS_PACKAGE} /> exported{' '}
            <code>css</code> function. Those objects are: select, control, icon,
            menu, noOptions, multiValue, and input.
          </Content>
        </Column>
        <Column widthPercent={60}>
          <CodeMarkup
            language='javascript'
            data={THEME_DEFAULTS}
            header='Theme Defaults'
            formatFn={stringifyJavascriptObj}
          />
        </Column>
      </Columns>
      <SubTitle>Using Classes</SubTitle>
      <Columns>
        <Column widthPercent={40}>
          <Content>
            If you want to style the component using CSS classes, set the{' '}
            <code>addClassNames</code> prop to true and it will then generate{' '}
            <code>className</code> attributes for that specific instance of the
            component. These are the classes that are available:
          </Content>
          <ListWrapper className='is-class-list'>
            <List>
              <ListItem>{SELECT_CONTAINER_CLS}</ListItem>
              <ListItem>{CONTROL_CONTAINER_CLS}</ListItem>
              <ListItem>{MENU_CONTAINER_CLS}</ListItem>
              <ListItem>{AUTOSIZE_INPUT_CLS}</ListItem>
              <ListItem>{CARET_ICON_CLS}</ListItem>
              <ListItem>{CLEAR_ICON_CLS}</ListItem>
              <ListItem>{LOADING_DOTS_CLS}</ListItem>
              <ListItem>{`${OPTION_CLS}, ${OPTION_FOCUSED_CLS}, ${OPTION_SELECTED_CLS}, ${OPTION_DISABLED_CLS}`}</ListItem>
            </List>
          </ListWrapper>
        </Column>
        <Column widthPercent={60}>{memoizedMarkupNode}</Column>
      </Columns>
      <SubTitle>Demo</SubTitle>
      <Hr />
      <Card>
        <CardHeader>
          <LabelHeader>Try selecting themeConfig objects below</LabelHeader>
        </CardHeader>
        <CardBody>
          <Columns>
            <Column widthPercent={40}>
              <div style={SELECT_CONTAINER_STYLE}>
                <Select
                  options={OPTIONS}
                  isClearable={false}
                  isSearchable={false}
                  themeConfig={themeConfig}
                  initialValue={OPTIONS[0]}
                  menuItemSize={menuItemSize}
                  onOptionChange={setSelectedOption}
                />
              </div>
            </Column>
            <Column widthPercent={60}>
              <CodeMarkup
                data={themeConfig}
                language='javascript'
                header='theme-config'
                formatFn={stringifyJavascriptObj}
              />
            </Column>
          </Columns>
        </CardBody>
      </Card>
    </Container>
  );
});