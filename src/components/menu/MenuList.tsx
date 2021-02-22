import React, { useMemo, Fragment, FunctionComponent } from 'react';
import Option from './Option';
import styled from 'styled-components';
import { isArrayWithLength } from '../../utils';
import { MenuListProps, ItemData } from '../../types';
import { FixedSizeList, ListItemKeySelector } from 'react-window';

const NoOptionsMsg = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.noOptions.color};
  margin: ${({ theme }) => theme.noOptions.margin};
  padding: ${({ theme }) => theme.noOptions.padding};
  font-size: ${({ theme }) => theme.noOptions.fontSize};
  ${({ theme }) => theme.noOptions.css}
`;

const MenuList: FunctionComponent<MenuListProps> = ({
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
  fixedSizeListRef,
  renderOptionLabel,
  focusedOptionIndex
}) => {
  const itemData = useMemo<ItemData>(() => ({
    menuOptions,
    selectOption,
    renderOptionLabel,
    focusedOptionIndex
  }), [menuOptions, focusedOptionIndex, selectOption, renderOptionLabel]);

  if (isLoading) {
    return <NoOptionsMsg>{loadingMsg}</NoOptionsMsg>;
  }

  const itemKey: ListItemKeySelector | undefined = itemKeySelector
    ? (idx, data) => data.menuOptions[idx][itemKeySelector]
    : undefined;

  return (
    <Fragment>
      <FixedSizeList
        width={width}
        height={height}
        itemKey={itemKey}
        itemSize={itemSize}
        itemData={itemData}
        ref={fixedSizeListRef}
        overscanCount={overscanCount}
        itemCount={menuOptions.length}
      >
        {Option}
      </FixedSizeList>
      {!isArrayWithLength(menuOptions) && noOptionsMsg && (
        <NoOptionsMsg>{noOptionsMsg}</NoOptionsMsg>
      )}
    </Fragment>
  );
};

export default MenuList;
