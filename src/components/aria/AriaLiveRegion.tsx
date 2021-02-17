import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { isArrayWithLength } from '../../utils';
import { AriaLiveRegionProps } from '../../types';
import { ARIA_LIVE_TESTID } from '../../constants';

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

const AriaLiveRegion: FunctionComponent<AriaLiveRegionProps> = ({
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

  const optionsMsg = `${optionCount} result(s) available${
    inputValue ? (' for search input ' + inputValue) : ''
  }.`;

  const focusedMsg = focusedOption.value
    ? `Focused option: ${focusedOption.label}${focusedOption.isDisabled ? ' - disabled' : ''}, ${
        focusedOption.index + 1
      } of ${optionCount}.`
    : '';

  const menuMsg = menuOpen
    ? 'Use Up and Down arrow keys to choose options, press Enter or Tab to select the currently focused option, press Escape to close the menu.'
    : `${ariaLabel || 'Select'} is focused${
        isSearchable ? ', type to filter options' : ''
      }, press Down arrow key to open the menu.`;

  const selectedOptionLabel = isArrayWithLength(selectedOption)
    ? selectedOption.map(({ label }) => label).join(' ')
    : 'N/A';

  const selectedOptionMsg = `Selected option: ${selectedOptionLabel}`;
  const extendedFeedbackMsg = `${focusedMsg} ${optionsMsg} ${menuMsg}`;

  return (
    <A11yText
      aria-live='polite'
      data-testid={ARIA_LIVE_TESTID}
    >
      <span>&nbsp;{selectedOptionMsg}</span>
      <span>&nbsp;{extendedFeedbackMsg}</span>
    </A11yText>
  );
};

export default AriaLiveRegion;