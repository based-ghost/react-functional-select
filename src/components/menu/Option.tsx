import React, { memo } from 'react';
import { areEqual } from 'react-window';
import { optionClassNames } from '../../utils';

import type { CSSProperties } from 'react';
import type { ItemData } from '../../types';

export type OptionProps = Readonly<{
  index: number;
  data: ItemData;
  style: CSSProperties;
}>;

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
  const className = optionClassNames(isDisabled, isSelected, (index === focusedOptionIndex));
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
