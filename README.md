[![NPM](https://img.shields.io/npm/v/react-functional-select.svg?style=flat-square)](https://www.npmjs.com/package/react-functional-select)
[![npm downloads](https://img.shields.io/npm/dt/react-functional-select.svg?style=flat-square)](https://www.npmjs.com/package/react-functional-select)
[![Issues](https://img.shields.io/github/issues/based-ghost/react-functional-select.svg?style=flat-square)](https://github.com/based-ghost/react-functional-select/issues)
[![License](https://img.shields.io/badge/license-mit-red.svg?style=flat-square)](LICENSE)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?style=flat-square)](https://github.com/styled-components/styled-components)

# react-functional-select

> Micro-sized & micro-optimized select component for React.js

See the accompanying [Interactive Storybook UI Site](https://master--625676b6922472003af898b4.chromatic.com) for live demos and detailed docs.

<strong>Key features:</strong>

- Extremely lightweight: ~6 kB (gzipped)!
- Advanced features like async mode, portal support, animations, and option virtualization
- Fully-featured & customizable: API comparable to [`react-select`](https://github.com/JedWatson/react-select)
- Engineered for ultimate performance: effortlessly scroll, filter, and key through datasets numbering in the tens of thousands using [`react-window`](https://github.com/bvaughn/react-window) + performance-first code. [Demo of handling 50,000 options here!](https://master--625676b6922472003af898b4.chromatic.com/?path=/story/react-functional-select-demos--virtualization)
- Extensible styling API with [`styled-components`](https://github.com/styled-components/styled-components)
- Accessible

<strong>Peer dependencies:</strong>

- [`styled-components`](https://github.com/styled-components/styled-components) for dynamic styling/theming via CSS-in-JS
- [`react-window`](https://github.com/bvaughn/react-window) for integrated menu option data virtualization

## Overview

Essentially, this is a focused subset of [`react-select`](https://github.com/JedWatson/react-select)'s API that is engineered for ultimate performance and minimal bundle size. It is built entirely with the `React Hooks` API (no legacy class components). The primary design principal revolves around weighing the cost/benefits of adding a feature against the impact to performance and/or number of lines of code its addition would have.

Any expected features not in the current API is likely due to the reason that such features would have added significant overhead to the package. In addition, if we expose the right public methods and/or callback properties, this feature should be trivial to add to wrapping components - proper decoupling and abstraction of code is key to keeping such channels open for similar customizations that can be kept out of this package. Please, feel free to offer enhancement ideas with/without technical solutions.

## Installation

```
$ npm i react-window styled-components react-functional-select
$ yarn add react-window styled-components react-functional-select
```

> <strong><em>Note that you need to be on a react version that supports hooks (>= 16.8.6)</em></strong>

## Usage

- [Demo](https://master--625676b6922472003af898b4.chromatic.com)
- [Stories source code](./__stories__)

```jsx
import { Select } from 'react-functional-select';
import React, { useState, useEffect, useCallback, type ComponentProps } from 'react';
import { Card, CardHeader, CardBody, Container, SelectContainer } from '../shared/components';

type SelectProps = ComponentProps<typeof Select>;

type Option = Readonly<{
  id: number;
  city: string;
  state: string;
}>;

const CITY_OPTIONS: Option[] = [
  { id: 1, city: 'Austin', state: 'TX' },
  { id: 2, city: 'Denver', state: 'CO' },
  { id: 3, city: 'Chicago', state: 'IL' },
  { id: 4, city: 'Phoenix', state: 'AZ' },
  { id: 5, city: 'Houston', state: 'TX' }
];

const SingleSelect: React.FC<SelectProps> = ({ isDisabled }) => {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const getOptionValue = useCallback((opt: Option): number => opt.id, []);
  const onOptionChange = useCallback((opt: Option | null): void => setSelectedOption(opt), []);
  const getOptionLabel = useCallback((opt: Option): string => `${opt.city}, ${opt.state}`, []);

  useEffect(() => {
    if (isDisabled) {
      setIsInvalid(false);
    }
  }, [isDisabled]);

  return (
    <Container>
      <Card>
        <CardHeader>
          {`Selected Option: ${JSON.stringify(selectedOption || {})}`}
        </CardHeader>
        <CardBody>
          <SelectContainer>
            <Select
              isClearable
              isInvalid={isInvalid}
              options={CITY_OPTIONS}
              isDisabled={isDisabled}
              onOptionChange={onOptionChange}
              getOptionValue={getOptionValue}
              getOptionLabel={getOptionLabel}
            />
          </SelectContainer>
        </CardBody>
      </Card>
    </Container>
  );
};

export default SingleSelect;
```

## Properties

All properties are technically optional (with a few having default values). Very similar to [`react-select`](https://github.com/JedWatson/react-select)'s API.

> <strong><em>Note that the following non-primitive properties should be properly memoized if defined:</em></strong><br>`clearIcon`, `caretIcon`, `options`, `renderOptionLabel`, `onMenuOpen`, `onOptionChange`, `onKeyDown`, `getOptionLabel`, `getOptionLabel`, `getOptionValue`, `onInputBlur`, `onInputFocus`, `onInputChange`, `onSearchChange`, `getIsOptionDisabled`, `getFilterOptionString`, `themeConfig`

| Property | Type | Default | Description
:---|:---|:---|:---
| `inputId`| string | `undefined` | The id of the autosize search input control
|`selectId`| string | `undefined` | The id of the parent select container element
|`menuId`| string | `undefined` | The id of the menu container element
|`ariaLabel`| string | `undefined` | Aria label (for assistive tech)
|`isMulti`| bool | `false` | Does the control allow for multiple selections (defaults to single-value mode)
|`async`| bool | `false` | Is the component in 'async' mode - when in 'async' mode, updates to the input search value will NOT cause the effect `useMenuOptions` to execute (this effect parses `options` into stateful value `menuOptions`)
|`autoFocus`| bool | `false` | Focus the control following initial mount of component
|`lazyLoadMenu`| bool | `false` | If `true`, the menu (wrapper & virtualized list components) will rendered in DOM only when `menuOpen` state is `true`
|`isLoading`| bool | `false` | Is the select in a state of loading - shows loading dots animation
|`isInvalid`| bool | `false` | Is the current value invalid - control recieves invalid styling
|`inputDelay`| number | `undefined` | The debounce delay in for the input search (milliseconds)
|`pageSize`| number | `5` | Number of options to jump in menu when page{up|down} keys are used
|`isDisabled`| bool | `false` | Is the select control disabled - recieves disabled styling
|`required`| bool | `false` | Is the select control required - applied to the `input` element. When `true`, the optionally specified CSS from the `themeConfig.input.cssRequired` field will be applied to the `input` element.
|`placeholder`| string | `Select option..` | Placeholder text for the select value
|`menuWidth`| string | number | `100%` | Width of the menu
|`menuItemSize`| number | `35` | The height of each option in the menu (px)
|`isClearable`| bool | `false` | Is the select value clearable
|`noOptionsMsg`| string | `No options` | The text displayed in the menu when there are no options available (to hide menu when search returns no items, set to `null` or `''`)
|`loadingMsg`| string | `Loading..` | The text displayed in the menu when `isLoading` === `true`
|`clearIcon`| ReactNode OR ((state: any) => ReactNode) | `undefined` | Custom clear icon node - `state` forwarded to a function is `{ menuOpen, isLoading, isInvalid, isDisabled }`
|`caretIcon`| ReactNode OR ((state: any) => ReactNode) | `undefined` | Custom caret icon node - `state` forwarded to a function is `{ menuOpen, isLoading, isInvalid, isDisabled }`
|`loadingNode`| ReactNode | `undefined` | Custom loading node
|`options`| array | `[]` | The menu options
|`isSearchable`| bool | `true` | Whether to enable search functionality or not
|`hideSelectedOptions`| bool | `false` | Hide the selected option from the menu (if undefined and isMulti = true, then defaults to true)
|`openMenuOnClick`| bool | `true` | If true, the menu can be toggled by clicking anywhere on the select control; if false, the menu can only be toggled by clicking the 'caret' icon on the far right of the control
|`menuMaxHeight`| number | `300` | Max height of the menu element - this effects how many options `react-window` will render
|`menuOverscanCount`| number | `1` | correlates to `react-window` property `overscanCount`: The number of items (options) to render outside of the visible area. Increasing the number can impact performance, but is useful if the option label is complex and the `renderOptionLabel` prop is defined
|`itemKeySelector`| string | number | `undefined` | If defined, will use the property in your original options as each option's key, rather than the parsed stateful value `menuOptions` index (this needs to be a unique property - so properties such as `id` or `value`). This relates to the `itemKey` property in dependency `react-window` - [more info here](https://react-window.now.sh/#/api/FixedSizeList)
|`menuScrollDuration`| number | `300` | Duration of scroll menu into view animation
|`menuItemDirection`| 'ltr' OR 'rtl' | `'ltr'` | The direction of text for each menu option and position of the menu's scroll bar (`react-window`'s `direction` prop)
|`ariaLabelledBy`| string | `undefined` | HTML ID of an element that should be used as the label (for assistive tech)
|`ariaLive`| 'off' OR 'polite' OR 'assertive' | `'polite'` | Used to set the priority with which screen reader should treat updates to live regions (translates to `aria-live` attribute)
|`openMenuOnFocus`| bool | `false` | Open the menu when the select control recieves focus
|`initialValue`| any | `undefined` | Initial select value
|`tabSelectsOption`| bool | `true` | Select the currently focused option when the user presses tab
|`blurInputOnSelect`| bool | `false` | Remove focus from the input when the user selects an option (useful for dismissing the keyboard on touch devices)
|`closeMenuOnSelect`| bool | `true` | Close the select menu when the user selects an option
|`isAriaLiveEnabled`| bool | `false` | Enables visually hidden div that reports stateful information (for assistive tech)
|`scrollMenuIntoView`| bool | `true` | Performs animated scroll to show menu in view when menu is opened (if there is room to do so)
|`backspaceClearsValue`| bool | `true` | Remove the currently focused option when the user presses backspace
|`filterMatchFrom`| 'any' OR 'start' | `'any'` | Position in stringified option to match search input
|`menuPosition`| 'top' OR 'auto' OR 'bottom' | `'bottom'` | Determines where menu will be placed in relation to the control - `'auto'` will first check if menu has space to open below the control, otherwise it will open above the control.
|`filterIgnoreCase`| bool | `true` | Search input ignores case of characters when comparing
|`filterIgnoreAccents`| bool | `false` | Search input will strip diacritics from string before comparing
|`onMenuOpen`| (...args: any[]) => void | `undefined` | Callback function executed after the menu is opened
|`onMenuClose`| (...args: any[]) => void | `undefined` | Callback function executed after the menu is closed
|`onOptionChange`| (data: any) => void | `undefined` | Callback function executed after a new option is selected
|`onKeyDown`| (e: KeyboardEvent, input?: string, focusedOption?: FocusedOption) => void | `undefined` | Callback function executed `onKeyDown` event
|`getOptionLabel`| (data: any) => string | number | `undefined` | Resolves option data to string | number to be displayed as the label by components (by default will use option.label)
|`getOptionValue`| (data: any) => string | number | `undefined` | Resolves option data to string | number to compare option values (by default will use option.value)
|`onInputBlur`| (e: FocusEvent) => void | `undefined` | Handle blur events on the search input
|`onInputFocus`| (e: FocusEvent) => void | `undefined` | Handle focus events on the search input
|`onInputChange`| (value: string) => void | `undefined` | Handle change events on the search input
|`onSearchChange`| (value: string) => void | `undefined` | Callback executed after the debounced search input value is persisted to the component's state - if no debounce is defined via the `inputDelay` property, it probably makes more sense to use `onInputChange` instead.
|`renderOptionLabel`| (data: any) => ReactNode | `undefined` | Formats option labels in the menu and control as JSX.Elements or React Components (by default will use `getOptionLabel`)
|`renderMultiOptions`| (params: any) => ReactNode | `undefined` | Allows for customization as to how multi-select options should be formatted. The `MultiParams` contains the array of selected options `{ selected: Array<{ data: any, value: string | number, label: string | number}>, renderOptionLabel: (data: any): ReactNode }`. Left and right arrow key navigation will also be disabled when this property is defined.
|`getIsOptionDisabled`| (data: any) => boolean | `undefined` | When defined will evaluate each option to determine whether it is disabled or not (if not specified, each option will be evaluated as to whether or not it contains a property of `isDisabled` with a value of `true`)
|`getFilterOptionString`| (option: any) => string | `undefined` | When defined will take each option and generate a string used in the filtering process (by default, will use option.label)
|`themeConfig`| Partial\<DefaultTheme\> | `undefined` | Object that takes specified property key-value pairs and merges them into the theme object
|`menuPortalTarget`| Element | `undefined` | Whether the menu should use a portal, and where it should attach
|`memoOptions`| bool | `false` | Whether to memoize each `Option` component

## Inspiration

This project was inspired by [`react-select`](https://github.com/JedWatson/react-select).

## License

MIT licensed. Copyright (c) [Matt Areddia](https://github.com/based-ghost) 2022.
