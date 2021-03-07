import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { isArrayWithLength } from '../../utils';
import { FocusedOption, SelectedOption } from '../../types';
import { ARIA_LIVE_SELECTION_ID, ARIA_LIVE_CONTEXT_ID } from '../../constants';

export type AriaLiveRegionProps = Readonly<{
  menuOpen: boolean;
  isFocused: boolean;
  ariaLabel?: string;
  inputValue: string;
  optionCount: number;
  isSearchable: boolean;
  focusedOption: FocusedOption;
  selectedOption: SelectedOption[];
}>;

const A11yText = styled.span`
  border: 0;
  padding: 0;
  width: 1px;
  height: 1px;
  z-index: 9999;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  clip: rect(1px, 1px, 1px, 1px);
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

  const selectedOptionMsg = 'Selected option: ' + selectedOptionLabel;
  const extendedFeedbackMsg = focusedMsg + optionsMsg + menuMsg;

  return (
    <A11yText
      aria-live='polite'
      aria-atomic='false'
      aria-relevant='additions text'
    >
      <span id={ARIA_LIVE_SELECTION_ID}>{selectedOptionMsg}</span>
      <span id={ARIA_LIVE_CONTEXT_ID}>{extendedFeedbackMsg}</span>
    </A11yText>
  );
};

export default AriaLiveRegion;