import React, { memo, type CSSProperties } from 'react';
import { areEqual } from 'react-window';
import type { ItemData } from '../../types';
import { buildOptionClsName } from '../../utils';

export type OptionProps = Readonly<{
  index: number;
  data: ItemData;
  style: CSSProperties;
}>;

// Custom comparison function for React.memo().
// Extends functionality provided from "areEqual" with added bailout feature based on value of "memoizeOptions"
const propsAreEqual = (
  prevProps: OptionProps,
  nextProps: OptionProps
): boolean => {
  const { memoizeOptions } = nextProps.data;
  return memoizeOptions && areEqual(prevProps, nextProps);
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
  const { data, value, label, isDisabled, isSelected } = menuOptions[index];
  const className = buildOptionClsName(isDisabled, isSelected, (index === focusedOptionIndex));
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
}, propsAreEqual);

Option.displayName = 'Option';

export default Option;
