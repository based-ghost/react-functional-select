import React from 'react';
import styled, { css } from 'styled-components';
import { LOADING_DOTS_CLS } from '../../constants';

import type { FunctionComponent } from 'react';

const StyledLoadingDots = styled.div`
  display: flex;
  align-self: center;
  text-align: center;
  margin-right: 0.25rem;
  padding: ${({ theme }) => theme.loader.padding};

  > div {
    border-radius: 100%;
    display: inline-block;
    will-change: transform;

    ${({ theme: { loader } }) => css`
      width: ${loader.size};
      height: ${loader.size};
      animation: ${loader.animation};
      background-color: ${loader.color};
    `}

    :nth-of-type(1) {
      animation-delay: -0.272s;
    }

    :nth-of-type(2) {
      animation-delay: -0.136s;
    }
  }
`;

const LoadingDots: FunctionComponent = () => (
  <StyledLoadingDots
    aria-hidden
    className={LOADING_DOTS_CLS}
  >
    <div />
    <div />
    <div />
  </StyledLoadingDots>
);

export default LoadingDots;