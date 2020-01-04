import React from 'react';
import styled from 'styled-components';
import { isArrayWithLength } from '../utils';
import { AriaLiveRegionProps } from '../types';

const A11yText = styled.span`
  border: 0;
  padding: 0;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
`;

const AriaLiveRegion: React.FC<AriaLiveRegionProps> = ({
  menuOpen,
  isFocused,
  ariaLabel,
  inputValue,
  optionCount,
  isSearchable,
  focusedOption,
  selectedOption
}) => {
  if (!isFocused) {
    return null;
  }

  const {
    value: focusedOptionValue,
    label: focusedOptionLabel,
    index: focusedOptionIndex,
    isDisabled: isFocusedOptionDisabled,
  } = focusedOption;

  const selectedOptionLabel = isArrayWithLength(selectedOption)
    ? selectedOption.map(x => x.label).join(' ')
    : 'N/A';

  const selectedOptionMsg = `Selected option: ${selectedOptionLabel}`;
  const optionsMsg = `${optionCount} result(s) available${inputValue ? ` for search input ${inputValue}` : ''}.`;

  const focusedMsg = focusedOptionValue
    ? `Focused option: ${focusedOptionLabel}${
        isFocusedOptionDisabled ? ' - disabled' : ''
      }, ${focusedOptionIndex + 1} of ${optionCount}.`
    : '';

  const menuMsg = menuOpen
    ? 'Use Up and Down arrow keys to choose options, press Enter or Tab to select the currently focused option, press Escape to close the menu.'
    : `${ariaLabel || 'Select'} is focused${isSearchable ? ', type to filter options' : ''}, press Down arrow key to open the menu.`;

  return (
    <A11yText aria-live='polite'>
      <p>{selectedOptionMsg}</p>
      <p>{`${focusedMsg} ${optionsMsg} ${menuMsg}`}</p>
    </A11yText>
  );
};

export default AriaLiveRegion;