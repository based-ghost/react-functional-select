import React from 'react';
import styled, { css } from 'styled-components';
import { CLEAR_ICON_CLS } from '../../constants';

import type { FunctionComponent } from 'react';

const ClearSvg = styled.svg`
  fill: currentColor;
  ${({ theme }) => css`
    width: ${theme.icon.clear.width};
    height: ${theme.icon.clear.height};
    animation: ${theme.icon.clear.animation};
    transition: ${theme.icon.clear.transition};
  `}
`;

const ClearSvgIcon: FunctionComponent = () => (
  <ClearSvg
    aria-hidden
    viewBox='0 0 14 16'
    className={CLEAR_ICON_CLS}
  >
    <path
      fillRule='evenodd'
      d='M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z'
    />
  </ClearSvg>
);


export default ClearSvgIcon;
