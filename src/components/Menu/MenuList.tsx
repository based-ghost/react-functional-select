import React, { useMemo, Fragment, type MutableRefObject, type FunctionComponent } from 'react';
import Option from './Option';
import styled from 'styled-components';
import { isArrayWithLength } from '../../utils';
import { FixedSizeList, type ListItemKeySelector } from 'react-window';
import type { MenuOption, ItemData, RenderLabelCallback } from '../../types';

export type MenuListProps = Readonly<{
  height: number;
  itemSize: number;
  loadingMsg: string;
  isLoading?: boolean;
  memoOptions: boolean;
  overscanCount?: number;
  width: string | number;
  direction?: 'ltr' | 'rtl';
  menuOptions: MenuOption[];
  focusedOptionIndex: number;
  noOptionsMsg: string | null;
  itemKeySelector?: string | number;
  renderOptionLabel: RenderLabelCallback;
  selectOption: (option: MenuOption) => void;
  fixedSizeListRef: MutableRefObject<FixedSizeList | null> | undefined;
}>;

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
  direction,
  isLoading,
  loadingMsg,
  menuOptions,
  memoOptions,
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
    memoOptions,
    selectOption,
    renderOptionLabel,
    focusedOptionIndex
  }), [menuOptions, memoOptions, focusedOptionIndex, selectOption, renderOptionLabel]);

  if (isLoading) {
    return <NoOptionsMsg>{loadingMsg}</NoOptionsMsg>;
  }

  const itemKey: ListItemKeySelector | undefined = itemKeySelector
    ? (index, data) => data.menuOptions[index][itemKeySelector]
    : undefined;

  return (
    <Fragment>
      <FixedSizeList
        width={width}
        height={height}
        itemKey={itemKey}
        itemSize={itemSize}
        itemData={itemData}
        direction={direction}
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
