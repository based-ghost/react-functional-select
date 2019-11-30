import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
`;

const StyledLoadingDots = styled.div`
  display: flex;
  align-self: center;
  text-align: center;
  margin-right: 0.25rem;
  padding: ${({ theme }) => theme.loader.padding};

  > div {
    border-radius: 100%;
    display: inline-block;
    animation: ${bounce} 1.19s ease-in-out infinite;
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