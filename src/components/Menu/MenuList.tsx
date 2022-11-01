import React, { useMemo, Fragment, type MutableRefObject, type FunctionComponent } from 'react';
import Option from './Option';
import styled from 'styled-components';
import type { MenuOption } from '../../Select';
import { isArrayWithLength } from '../../utils';
import { FixedSizeList, type ListItemKeySelector } from 'react-window';
import type { ItemData, RenderLabelCallback, SelectedOption } from '../../types';

export type MenuListProps = Readonly<{
  height: number;
  itemSize: number;
  loadingMsg: string;
  isLoading?: boolean;
  overscanCount?: number;
  width: string | number;
  memoOptions: boolean;
  direction?: 'ltr' | 'rtl';
  menuOptions: MenuOption[];
  focusedOptionIndex: number;
  noOptionsMsg: string | null;
  itemKeySelector?: string | number;
  renderOptionLabel: RenderLabelCallback;
  fixedSizeListRef: MutableRefObject<FixedSizeList | null> | undefined;
  selectOption: (option: SelectedOption, isSelected?: boolean) => void;
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
