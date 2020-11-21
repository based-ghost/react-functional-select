import React, { useMemo, Fragment } from 'react';
import Option from './Option';
import styled from 'styled-components';
import { isArrayWithLength } from '../utils';
import { MenuProps, ItemData } from '../types';
import { FixedSizeList, ListItemKeySelector } from 'react-window';

const NoOptionsMsg = styled.div`
  text-align: center;
  ${({ theme: { noOptions }}) => `
    color: ${noOptions.color};
    margin: ${noOptions.margin};
    padding: ${noOptions.padding};
    font-size: ${noOptions.fontSize};
  `}
  ${({ theme }) => theme.noOptions.css}
`;

const Menu = React.forwardRef<FixedSizeList, MenuProps>((
  {
    width,
    height,
    itemSize,
    isLoading,
    loadingMsg,
    menuOptions,
    selectOption,
    noOptionsMsg,
    overscanCount,
    itemKeySelector,
    renderOptionLabel,
    focusedOptionIndex
  },
  ref: React.Ref<FixedSizeList>
) => {
  const itemKey = useMemo<ListItemKeySelector | undefined>(() => {
    return itemKeySelector ? (idx, data) => data.menuOptions[idx][itemKeySelector] : undefined;
  }, [itemKeySelector]);

  const itemData = useMemo<ItemData>(() => ({
    menuOptions,
    selectOption,
    renderOptionLabel,
    focusedOptionIndex
  }), [menuOptions, focusedOptionIndex, selectOption, renderOptionLabel]);

  if (isLoading) {
    return <NoOptionsMsg>{loadingMsg}</NoOptionsMsg>;
  }

  return (
    <Fragment>
      <FixedSizeList
        ref={ref}
        width={width}
        height={height}
        itemKey={itemKey}
        itemSize={itemSize}
        itemData={itemData}
        overscanCount={overscanCount}
        itemCount={menuOptions.length}
      >
        {Option}
      </FixedSizeList>
      {!isArrayWithLength(menuOptions) && <NoOptionsMsg>{noOptionsMsg}</NoOptionsMsg>}
    </Fragment>
  );
});

Menu.displayName = 'Menu';

export default Menu;
