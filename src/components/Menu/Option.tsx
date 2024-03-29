import React, { memo, type CSSProperties } from 'react';
import { areEqual } from 'react-window';
import type { ItemData } from '../../types';
import { buildOptionClass } from '../../utils';

type OptionProps = Readonly<{
  index: number;
  data: ItemData;
  style: CSSProperties;
}>;

// extends react-window 'areEqual'
const _areEqual = (
  prevProps: OptionProps,
  nextProps: OptionProps
): boolean => {
  const { memoOptions } = nextProps.data;
  return memoOptions && areEqual(prevProps, nextProps);
};

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
  const opt = menuOptions[index];

  const className = buildOptionClass(
    opt.isDisabled,
    opt.isSelected,
    index === focusedOptionIndex
  );

  return (
    <div
      style={style}
      className={className}
      onClick={() => selectOption(opt)}
    >
      {renderOptionLabel(opt.data)}
    </div>
  );
}, _areEqual);

Option.displayName = 'Option';

export default Option;
