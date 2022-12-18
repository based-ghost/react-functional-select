import React from 'react';
import styled from 'styled-components';
import { ARIA_LIVE_SELECTION_ID, ARIA_LIVE_CONTEXT_ID } from '../../constants';
import type { FocusedOption, SelectedOption, AriaLiveAttribute } from '../../types';

type AriaLiveRegionProps = Readonly<{
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
  z-index: 9999;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  clip-path: inset(50%);
  clip: rect(1px, 1px, 1px, 1px);
`;

const AriaLiveRegion: React.FC<AriaLiveRegionProps> = ({
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

  // message contents for "aria-context"
  const { index, label, isDisabled, isSelected } = focusedOption;

  const menuMsg = menuOpen
    ? `Use Up and Down to choose options${isDisabled ? '' : ', press Enter or Tab to select the currently focused option'}, press Escape to close the menu.`
    : `${ariaLabel} is focused${isSearchable ? ', type to filter options' : ''}, press Down arrow key to open the menu.`;

  const focusedMsg = label
    ? `Option ${label} is ${isSelected ? 'selected' : 'focused'}${isDisabled ? ' disabled' : ''}, ${index + 1} of ${optionCount}.`
    : '';

  const optionsMsg = `${optionCount} option(s) available${inputValue ? (' for search ' + inputValue) : ''}.`;
  const ariaContextMsg = `${focusedMsg} ${optionsMsg} ${menuMsg}`.trimStart();

  // message contents for "aria-selection" SPAN
  const selectedLbls = selectedOption.length ? selectedOption.map((x) => x.label).join(' ') : 'N/A';
  const selectionMsg = `Selected option: ${selectedLbls}`;

  return (
    <A11yText
      aria-atomic="false"
      aria-live={ariaLive}
      aria-relevant="additions text"
    >
      <span id={ARIA_LIVE_SELECTION_ID}>
        {selectionMsg}
      </span>
      <span id={ARIA_LIVE_CONTEXT_ID}>
        {ariaContextMsg}
      </span>
    </A11yText>
  );
};

export default AriaLiveRegion;