import styled from 'styled-components';
import React, { type FunctionComponent } from 'react';
import { ARIA_LIVE_SELECTION_ID, ARIA_LIVE_CONTEXT_ID } from '../../constants';
import type { FocusedOption, SelectedOption, AriaLiveAttribute } from '../../types';

export type AriaLiveRegionProps = Readonly<{
  menuOpen: boolean;
  isFocused: boolean;
  ariaLabel?: string;
  inputValue: string;
  optionCount: number;
  isSearchable: boolean;
  ariaLive?: AriaLiveAttribute;
  focusedOption: FocusedOption;
  selectedOption: SelectedOption[];
}>;

const A11yText = styled.span`
  border: 0;
  padding: 0;
  width: 1px;
  height: 1px;
  margin: -1px;
  z-index: 9999;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
`;

const AriaLiveRegion: FunctionComponent<AriaLiveRegionProps> = ({
  menuOpen,
  isFocused,
  inputValue,
  optionCount,
  isSearchable,
  focusedOption,
  selectedOption,
  ariaLive = 'polite',
  ariaLabel = 'Select'
}) => {
  if (!isFocused) {
    return null;
  }

  // Message contents for "aria-context" SPAN
  const menuMsg = menuOpen
    ? 'Use Up and Down arrow keys to choose options, press Enter or Tab to select the currently focused option, press Escape to close the menu.'
    : `${ariaLabel} is focused${isSearchable ? ', type to filter options' : ''}, press Down arrow key to open the menu.`;

  const { index, value, label, isDisabled } = focusedOption;
  const focusedMsg = (value && !isDisabled) ? `Option ${label} is focused, ${index + 1} of ${optionCount}.` : '';
  const optionsMsg = `${optionCount} option(s) available${inputValue ? (' for search ' + inputValue) : ''}.`;

  const ariaContextMsg = `${focusedMsg} ${optionsMsg} ${menuMsg}`.trimStart();

  // Message contents for "aria-selection" SPAN
  const labels = selectedOption.length ? selectedOption.map((x) => x.label).join(' ') : 'N/A';
  const selectionMsg = `Selected option: ${labels}`;

  return (
    <A11yText
      aria-atomic="false"
      aria-live={ariaLive}
      aria-relevant="additions text"
    >
      <span id={ARIA_LIVE_SELECTION_ID}>{selectionMsg}</span>
      <span id={ARIA_LIVE_CONTEXT_ID}>{ariaContextMsg}</span>
    </A11yText>
  );
};

export default AriaLiveRegion;