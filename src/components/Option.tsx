import React, { memo } from 'react';
import { OptionProps } from '../types';
import { areEqual } from 'react-window';
import { buildOptionClassName } from '../utils';

const Option = memo<OptionProps>(({
  index,
  style,
  data: {
    menuOptions,
    selectOption,
    renderOptionLabel,
    focusedOptionIndex
  }
}) => {
  const { data, value, label, isDisabled, isSelected } = menuOptions[index];
  const className = buildOptionClassName(isDisabled, isSelected, (index === focusedOptionIndex));
  const onClick = !isDisabled ? () => selectOption({ data, value, label }, isSelected) : undefined;

  return (
    <div
      style={style}
      onClick={onClick}
      className={className}
    >
      {renderOptionLabel(data)}
    </div>
  );
}, areEqual);

Option.displayName = 'Option';

export default Option;
