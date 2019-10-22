import React from 'react';
import { areEqual } from 'react-window';
import { OptionProps, MenuOption } from '../../types/index.';
import { createID, createClassName } from '../../utils';
import { OPTION_CLS, OPTION_FOCUSED_CLS, OPTION_SELECTED_CLS, OPTION_DISABLED_CLS } from '../../constants/attributes';

const Option = React.memo<OptionProps>(({
  index,
  style,
  data: {
    idSuffix,
    menuOptions,
    selectOption,
    renderOptionLabel,
    focusedOptionIndex,
    selectedOptionValue,
  },
}) => {
  const { data, value, label, isDisabled }: MenuOption = menuOptions[index];
  const isSelected: boolean = (value === selectedOptionValue);

  const className: string = createClassName([
    OPTION_CLS,
    isDisabled && OPTION_DISABLED_CLS,
    isSelected && OPTION_SELECTED_CLS,
    (index === focusedOptionIndex) && OPTION_FOCUSED_CLS
  ]);

  return (
    <div
      style={style}
      className={className}
      id={idSuffix ? createID(`${OPTION_CLS}-${index}`, idSuffix) : undefined}
      onClick={!isDisabled ? (() => selectOption({ data, value, label }, isSelected)) : undefined}
    >
      {renderOptionLabel(data)}
    </div>
  );
}, areEqual);

Option.displayName = 'Option';

export default Option;
