import React, { FunctionComponent } from 'react';
import { LoadingDotsProps } from '../types';
import styled, { css } from 'styled-components';
import { LOADING_DOTS_CLS } from '../constants/dom';

const StyledLoadingDots = styled.div`
  display: flex;
  align-self: center;
  text-align: center;
  margin-right: 0.25rem;
  padding: ${({ theme }) => theme.loader.padding};

  > div {
    border-radius: 100%;
    display: inline-block;

    ${({ theme: { loader } }) => css`
      width: ${loader.size};
      height: ${loader.size};
      background-color: ${loader.color};
      animation: ${loader.animation};
    `}

    :nth-of-type(1) {
      animation-delay: -0.272s;
    }

    :nth-of-type(2) {
      animation-delay: -0.136s;
    }
  }
`;

const LoadingDots: FunctionComponent<LoadingDotsProps> = ({ addClassNames }) => (
  <StyledLoadingDots
    aria-hidden='true'
    className={addClassNames ? LOADING_DOTS_CLS : undefined}
  >
    <div />
    <div />
    <div />
  </StyledLoadingDots>
);

export default LoadingDots;