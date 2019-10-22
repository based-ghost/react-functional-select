import React from 'react';
import styled from 'styled-components';
import { AriaLiveRegionProps } from '../../types/index.';

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
  ariaLabel,
  inputValue,
  optionCount,
  isSearchable,
  focusedOptionLabel,
  focusedOptionIndex,
  selectedOptionLabel,
  isFocusedOptionDisabled,
}) => (
  <A11yText aria-live='polite'>
    <p>{`Selected option: ${selectedOptionLabel || 'N/A'}`}</p>
    <p>
      {
        `Focused option: ${focusedOptionLabel || 'N/A'}${isFocusedOptionDisabled ? ' - disabled' : ''}, ${focusedOptionIndex + 1} of ${optionCount}.
        ${optionCount} result${optionCount !== 1 ? 's' : ''} available${inputValue ? (' for search input ' + inputValue) : ''}.
        ${menuOpen
          ? 'Use Up and Down arrow keys to choose options, press Enter or Tab to select the currently focused option, press Escape to close the menu.'
          : `${ariaLabel || 'Select'} is focused${isSearchable ? ', type to filter options' : ''}, press Down arrow key to open the menu.`}`
      }    
    </p>
  </A11yText>
);

export default AriaLiveRegion;