import React, { useMemo, Fragment } from 'react';
import Option from './Option';
import styled from 'styled-components';
import { FixedSizeList } from 'react-window';
import { isArrayWithLength } from '../utils';
import { MenuProps, ItemData } from '../types';

const NoOptionsMsg = styled.div`
  text-align: center;
  ${({ theme: { noOptions }}) => (`
    color: ${noOptions.color};
    margin: ${noOptions.margin};
    padding: ${noOptions.padding};
    font-size: ${noOptions.fontSize};
    ${noOptions.css || ''}
  `)}
`;

const Menu = React.forwardRef<FixedSizeList, MenuProps>((
  {
    width,
    itemSize,
    maxHeight,
    menuOptions,
    selectOption,
    noOptionsMsg,
    overscanCount,
    renderOptionLabel,
    focusedOptionIndex
  },
  ref: React.Ref<FixedSizeList>
) => {
  const itemData = useMemo<ItemData>(() => ({
    menuOptions,
    selectOption,
    renderOptionLabel,
    focusedOptionIndex
  }), [menuOptions, focusedOptionIndex, selectOption, renderOptionLabel]);

  return (
    <Fragment>
      <FixedSizeList
        ref={ref}
        width={width}
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
