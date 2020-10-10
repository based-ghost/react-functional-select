# react-functional-select

> Micro-sized & micro-optimized select component for React.js.

[![Latest Stable Version](https://img.shields.io/npm/v/react-functional-select.svg?style=for-the-badge)](https://www.npmjs.com/package/react-functional-select)
[![Issues](https://img.shields.io/github/issues/based-ghost/react-functional-select.svg?style=for-the-badge)](https://github.com/based-ghost/react-functional-select/issues)
[![License](https://img.shields.io/badge/license-mit-red.svg?style=for-the-badge)](https://www.npmjs.com/package/react-functional-select)
[![Downloads](https://img.shields.io/npm/dt/react-functional-select?style=for-the-badge)](https://www.npmjs.com/package/react-functional-select)

<strong>Key features:</strong>

- Fully-featured package that is truly lightweight: 8 KB (gzipped)!
- Extensible styling API with [`styled-components`](https://github.com/styled-components/styled-components)
- Opt-in properties to make the component fully accessible
- Effortlessly scroll, filter, and key through datasets numbering in the tens of thousands via [`react-window`](https://github.com/bvaughn/react-window) + performance-first code. [See in memory load tests from 100 to 50,000 options here!](https://based-ghost.github.io/react-functional-select/?path=/story/react-functional-select--windowing)
- Async mode for fetching dynamic options from a remote server using the search input value (starting in `v2.1.0`)

<strong>Peer dependencies:</strong>

- [`styled-components`](https://github.com/styled-components/styled-components) for dynamic styling/theming via CSS-in-JS
- [`react-window`](https://github.com/bvaughn/react-window) for integrated menu option data virtualization/windowing

## Overview

Essentially, this is a focused subset of [`react-select`](https://github.com/JedWatson/react-select)'s API that is engineered for ultimate performance and minimal bundle size. It is built entirely using `React Hooks` and `FunctionComponents`.  The primary design principal revolves around weighing the cost/benefits of adding a feature against the impact to performance & # of lines of code its addition would have.

I opted to exclude less "in-demand" features such as:

- Preventing scroll events on the app's body if the menu is open <strong><em>TODO: add code example</em></strong>
- Closing an open menu if the app's body is scrolled <strong><em>TODO: add code example</em></strong>

These feature would have added significant overhead to the package. In addition, if we expose the right public methods and/or callback properties, this feature should be trivial to add to wrapping components - proper decoupling and abstraction of code is key to keeping such channels open for similar customizations that can be kept out of this package.

## Installation

```
$ npm i react-window styled-components react-functional-select
$ yarn add react-window styled-components react-functional-select
```

> <strong><em>Note that you need to be on a react version that supports hooks, e.g.</em></strong><br>`react@^16.8 react-dom@^16.8 react-is@^16.8`

## Usage

- [Demo](https://based-ghost.github.io/react-functional-select/)
- [Stories source code](./__stories__)

<em>You can find a similar example, along with others, in the storybook..</em>

```tsx
import { Select } from 'react-functional-select';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardBody, Container, SelectContainer } from './helpers/styled';

type CityOption = {
  readonly id: number;
  readonly city: string;
  readonly state: string;
};

const _cityOptions: CityOption[] = [
  { id: 1, city: 'Austin', state: 'TX' },
  { id: 2, city: 'Denver', state: 'CO' },
  { id: 3, city: 'Chicago', state: 'IL' },
  { id: 4, city: 'Phoenix', state: 'AZ' },
  { id: 5, city: 'Houston', state: 'TX' }
];

const SingleSelectDemo: React.FC = () => {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isClearable, setIsClearable] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<CityOption | null>(null);

  const getOptionValue = useCallback((option: CityOption): number => option.id, []);
  const onOptionChange = useCallback((option: CityOption | null): void => setSelectedOption(option), []);
  const getOptionLabel = useCallback((option: CityOption): string => `${option.city}, ${option.state}`, []);

  useEffect(() => {
    isDisabled && setIsInvalid(false);
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
              isInvalid={isInvalid}
              options={_cityOptions}
              isDisabled={isDisabled}
              isClearable={isClearable}
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
```

## Properties

All properties are technically optional (with a few having default values). Very similar with [`react-select`](https://github.com/JedWatson/react-select)'s API.

> <strong><em>Note that the following non-primitive properties should be properly memoized if defined:</em></strong><br>`clearIcon`, `caretIcon`, `options`, `renderOptionLabel`, `renderMultiOptions`, `onMenuOpen`, `onOptionChange`, `onKeyDown`, `getOptionLabel`, `getOptionLabel`, `getOptionValue`, `onInputBlur`, `onInputFocus`, `onInputChange`, `onSearchChange`, `getIsOptionDisabled`, `getFilterOptionString`, `themeConfig`

| Property | Type | Default | Description
:---|:---|:---|:---
| `inputId`| string | `undefined` | The id of the autosize search input
|`selectId`| string | `undefined` | The id of the parent div
|`ariaLabel`| string | `undefined` | Aria label (for assistive tech)
|`isMulti`| bool | `false` | Does the control allow for multiple selections (defaults to single-value mode)
|`async`| bool | `false` | Is the component in 'async' mode - when in 'async' mode, updates to the input search value will NOT cause the effect `useMenuOptions` to execute (this effect parses `options` into stateful value `menuOptions`)
|`autoFocus`| bool | `false` | Focus the control following initial mount of component
|`isLoading`| bool | `false` | Is the select in a state of loading - shows loading dots animation
|`isInvalid`| bool | `false` | Is the current value invalid - control recieves invalid styling
|`inputDelay`| number | `undefined` | The debounce delay in for the input search (milliseconds)
|`isDisabled`| bool | `false` | Is the select control disabled - recieves disabled styling
|`required`| bool | `false` | Is the select control required - applied to the `input` element. When `true`, the optionally specified CSS from the `themeConfig.input.cssRequired` field will be applied to the `input` element.
|`placeholder`| string | `Select option..` | Placeholder text for the select value
|`menuWidth`| ReactText | `100%` | Width of the menu
|`menuItemSize`| number | `35` | The height of each option in the menu (px)
|`isClearable`| bool | `false` | Is the select value clearable
|`noOptionsMsg`| string | `No options` | The text displayed in the menu when there are no options available
|`loadingMsg`| string | `Loading...` | The text displayed in the menu when `isLoading` === `true`
|`clearIcon`| ReactNode OR ((state: Partial\<IndicatorIconsProps\>) => ReactNode) | `undefined` | Custom clear icon node - `state` forwarded to a function is `{ menuOpen, isLoading, isInvalid, isDisabled }`
|`caretIcon`| ReactNode OR ((state: Partial\<IndicatorIconsProps\>) => ReactNode) | `undefined` | Custom caret icon node - `state` forwarded to a function is `{ menuOpen, isLoading, isInvalid, isDisabled }`
|`loadingNode`| ReactNode | `undefined` | Custom loading node
|`options`| array | `[]` | The menu options
|`isSearchable`| bool | `true` | Whether to enable search functionality or not
|`hideSelectedOptions`| bool | `false` | Hide the selected option from the menu (if undefined and isMulti = true, then defaults to true)
|`openMenuOnClick`| bool | `true` | If true, the menu can be toggled by clicking anywhere on the select control; if false, the menu can only be toggled by clicking the 'caret' icon on the far right of the control
|`menuMaxHeight`| number | `300` | Max height of the menu element - this effects how many options `react-window` will render
|`menuOverscanCount`| number | `1` | correlates to `react-window` property `overscanCount`: The number of items (options) to render outside of the visible area. Increasing the number can impact performance, but is useful if the option label is complex and the `renderOptionLabel` prop is defined
|`itemKeySelector`| ReactText | `undefined` | If defined, will use the property in your original options as each option's key, rather than the parsed stateful value `menuOptions` index (this needs to be a unique property - so properties such as `id` or `value`). This relates to the `itemKey` property in dependency `react-window` - [more info here](https://react-window.now.sh/#/api/FixedSizeList)
|`menuScrollDuration`| number | `300` | Duration of scroll menu into view animation
|`addClassNames`| bool | `false` | Should static classNames be generated for container elements (enable if styling using CSS stylesheets)
|`ariaLabelledBy`| string | `undefined` | HTML ID of an element that should be used as the label (for assistive tech)
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
|`onMenuOpen`| (...args: any[]): void | `undefined` | Callback function executed after the menu is opened
|`onMenuClose`| (...args: any[]): void | `undefined` | Callback function executed after the menu is closed
|`onOptionChange`| (data: any): void | `undefined` | Callback function executed after a new option is selected
|`onKeyDown`| (e: KeyboardEvent\<HTMLDivElement\>, input?: string, focusedOption?: FocusedOption): void | `undefined` | Callback function executed `onKeyDown` event
|`getOptionLabel`| (data: any): ReactText | `undefined` | Resolves option data to React.ReactText to be displayed as the label by components (by default will use option.label)
|`getOptionValue`| (data: any): ReactText | `undefined` | Resolves option data to React.ReactText to compare option values (by default will use option.value)
|`onInputBlur`| (e: FocusEvent\<HTMLInputElement\>): void | `undefined` | Handle blur events on the search input
|`onInputFocus`| (e: FocusEvent\<HTMLInputElement\>): void | `undefined` | Handle focus events on the search input
|`onInputChange`| (value: string): void | `undefined` | Handle change events on the search input
|`onSearchChange`| (value: string): void | `undefined` | Callback executed after the debounced search input value is persisted to the component's state - if no debounce is defined via the `inputDelay` property, it probably makes more sense to use `onInputChange` instead.
|`renderOptionLabel`| (data: any): ReactNode | `undefined` | Formats option labels in the menu and control as JSX.Elements or React Components (by default will use `getOptionLabel`)
|`renderMultiOptions`| (params: MultiParams): ReactNode | `undefined` | Allows for customization as to how multi-select options should be formatted. The `MultiParams` contains the array of selected options `{ selected: Array<{ data: any, value: ReactText, label: ReactText}>, renderOptionLabel: (data: any): ReactNode }`. Left and right arrow key navigation will also be disabled when this property is defined.
|`getIsOptionDisabled`| (data: any): boolean | `undefined` | When defined will evaluate each option to determine whether it is disabled or not (if not specified, each option will be evaluated as to whether or not it contains a property of `isDisabled` with a value of `true`)
|`getFilterOptionString`| (option: any): string | `undefined` | When defined will take each option and generate a string used in the filtering process (by default, will use option.label)
|`themeConfig`| Partial\<DefaultTheme\> | `undefined` | Object that takes specified property key-value pairs and merges them into the theme object

## Inspiration

This project was inspired by [`react-select`](https://github.com/JedWatson/react-select).

## License

MIT licensed. [Matt Areddia](https://github.com/based-ghost) &copy; 2019.