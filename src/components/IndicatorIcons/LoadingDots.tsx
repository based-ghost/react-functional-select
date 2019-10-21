import React from 'react';
import styled from 'styled-components';
import { bounceAnimationCss } from '../../constants/styled';

const StyledLoadingDots = styled.div`
  display: flex;
  align-self: center;
  text-align: center;
  margin-right: 0.25rem;
  padding: ${({ theme }) => theme.loader.padding};

  > div {
    border-radius: 100%;
    display: inline-block;

    ${bounceAnimationCss}
    width: ${({ theme }) => theme.loader.size};
    height: ${({ theme }) => theme.loader.size};
    opacity: ${({ theme }) => theme.loader.opacity};
    background-color: ${({ theme }) => theme.loader.color};

    :nth-of-type(1) {
      animation-delay: -0.272s;
    }

    :nth-of-type(2) {
      animation-delay: -0.136s;
    }
  }
`;

const LoadingDots: React.FC = () => (
  <StyledLoadingDots aria-hidden='true'>
    <div />
    <div />
    <div />
  </StyledLoadingDots>
);

export default LoadingDots;