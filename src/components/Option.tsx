import React from 'react';
import { OptionProps } from '../types';
import { areEqual } from 'react-window';
import { OPTION_CLS, OPTION_FOCUSED_CLS, OPTION_SELECTED_CLS, OPTION_DISABLED_CLS } from '../constants/dom';

const Option = React.memo<OptionProps>(({
  index,
  style,
  data: {
    menuOptions,
    selectOption,
    renderOptionLabel,
    focusedOptionIndex,
  },
}) => {
  const {
    data,
    value,
    label,
    isDisabled,
    isSelected
  } = menuOptions[index];

  const className = OPTION_CLS
    + (isDisabled ? ' ' + OPTION_DISABLED_CLS : '')
    + (isSelected ? ' ' + OPTION_SELECTED_CLS : '')
    + ((index === focusedOptionIndex) ? ' ' + OPTION_FOCUSED_CLS : '');

  return (
    <div
      style={style}
      className={className}
      onClick={!isDisabled ? (() => selectOption({ data, value, label }, isSelected)) : undefined}
    >
      {renderOptionLabel(data)}
    </div>
  );
}, areEqual);

Option.displayName = 'Option';

export default Option;
