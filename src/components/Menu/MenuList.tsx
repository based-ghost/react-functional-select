import React, { useMemo, Fragment } from 'react';
import Option from './Option';
import styled from 'styled-components';
import { VariableSizeList } from 'react-window';
import { isArrayWithLength } from '../../utils';

import type { MenuOption } from '../../Select';
import type { ListItemKeySelector } from 'react-window';
import type { ReactText, MutableRefObject, FunctionComponent } from 'react';
import type { ItemData, RenderLabelCallback, SelectedOption } from '../../types';

export type MenuListProps = Readonly<{
  height: number;
  getItemSize: (index: number) => number;
  loadingMsg: string;
  isLoading?: boolean;
  overscanCount?: number;
  width: string | number;
  direction?: 'ltr' | 'rtl';
  menuOptions: MenuOption[];
  focusedOptionIndex: number;
  noOptionsMsg: string | null;
  itemKeySelector?: ReactText;
  renderOptionLabel: RenderLabelCallback;
  variableSizeListRef: MutableRefObject<VariableSizeList | null>;
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
  getItemSize: itemSize,
  direction,
  isLoading,
  loadingMsg,
  menuOptions,
  selectOption,
  noOptionsMsg,
  overscanCount,
  itemKeySelector,
  variableSizeListRef: fixedSizeListRef,
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
      <VariableSizeList
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
      </VariableSizeList>
      {!isArrayWithLength(menuOptions) && noOptionsMsg && (
        <NoOptionsMsg>{noOptionsMsg}</NoOptionsMsg>
      )}
    </Fragment>
  );
};

export default MenuList;
