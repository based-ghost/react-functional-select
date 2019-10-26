import React, { useMemo, Fragment } from 'react';
import Option from './Option';
import styled from 'styled-components';
import { FixedSizeList } from 'react-window';
import { isArrayWithLength } from '../utils';
import { MenuProps, ItemData } from '../types';

const NoOptionsMsg = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.noOptions.color};
  margin: ${({ theme }) => theme.noOptions.margin};
  padding: ${({ theme }) => theme.noOptions.padding};
  font-size: ${({ theme }) => theme.noOptions.fontSize};
`;

const Menu = React.forwardRef<FixedSizeList, MenuProps>((
  {
    width,
    itemSize,
    idSuffix,
    maxHeight,
    menuOptions,
    selectOption,
    noOptionsMsg,
    overscanCount,
    renderOptionLabel,
    focusedOptionIndex,
    selectedOptionValue,
  }, 
  ref: React.Ref<FixedSizeList>,
) => {
  const itemData = useMemo<ItemData>(() => ({
    idSuffix,
    menuOptions,
    selectOption,
    renderOptionLabel,
    focusedOptionIndex,
    selectedOptionValue,
  }), [idSuffix, menuOptions, focusedOptionIndex, selectedOptionValue, selectOption, renderOptionLabel]);

  return (
    <Fragment>
      <FixedSizeList
        ref={ref}
        width={width!}
        itemSize={itemSize}
        itemData={itemData}
        overscanCount={overscanCount}
        itemCount={menuOptions.length}
        height={Math.min(maxHeight, menuOptions.length * itemSize)}
      >
        {Option}
      </FixedSizeList>
      {!isArrayWithLength(menuOptions) && <NoOptionsMsg>{noOptionsMsg}</NoOptionsMsg>}
    </Fragment>
  );
});

Menu.displayName = 'Menu';

export default Menu;
