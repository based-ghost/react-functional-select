import React, { memo } from 'react';
import { OptionProps } from '../types';
import { areEqual } from 'react-window';
import { optionClassName } from '../utils';

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
  const className = optionClassName(isDisabled, isSelected, (index === focusedOptionIndex));
  const onClickHandler = !isDisabled ? () => selectOption({ data, value, label }, isSelected) : undefined;

  return (
    <div
      style={style}
      className={className}
      onClick={onClickHandler}
    >
      {renderOptionLabel(data)}
    </div>
  );
}, areEqual);

Option.displayName = 'Option';

export default Option;
