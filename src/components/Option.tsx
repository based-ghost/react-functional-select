import React from 'react';
import { areEqual } from 'react-window';
import { optionClassName } from '../utils';
import { MenuOption, OptionProps } from '../types';

const Option = React.memo<OptionProps>(({
  index,
  style,
  data: {
    menuOptions,
    selectOption,
    renderOptionLabel,
    focusedOptionIndex
  }
}) => {
  const { data, value, label, isDisabled, isSelected }: MenuOption = menuOptions[index];
  const className = optionClassName(isDisabled, isSelected, (index === focusedOptionIndex));

  const onClickHandler = !isDisabled
    ? (() => selectOption({ data, value, label }, isSelected))
    : undefined;

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
