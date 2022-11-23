import React, { type FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { LOADING_DOTS_CLS } from '../../constants';

const StyledLoadingDots = styled.div`
  display: flex;
  align-self: center;
  text-align: center;
  margin-right: 0.25rem;
  padding: ${({ theme }) => theme.loader.padding};

  > div {
    border-radius: 100%;
    display: inline-block;
    ${({ theme }) => css`
      width: ${theme.loader.size};
      height: ${theme.loader.size};
      animation: ${theme.loader.animation};
      background-color: ${theme.loader.color};
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