import React from 'react';
import { Button } from './styled';
import { numberWithCommas } from './utils';
import styled, { css } from 'styled-components';

type StyledButtonProps = {
  readonly isActive?: boolean;
};

type OptionsCountButtonProps = {
  readonly count: number;
  readonly optionsCount: number;
  readonly setOptionsCount: (count: number) => void;
};

const StyledButton = styled(Button)<StyledButtonProps>`
  transition: color 0.115s ease, background-color 0.115s ease;

  ${({ isActive }) => isActive && css`
    color: #fff;
    background-color: #007bff;
    :hover {
      background-color: #0067EB;
    }
  `}

  :focus {
    color: #fff !important;
    background-color: #007bff !important;
  }
`;

const OptionsCountButton: React.FC<OptionsCountButtonProps> = ({
  count,
  optionsCount,
  setOptionsCount,
}) => {
  const isActive = !!(count === optionsCount);
  const onClick = !isActive ? (() => setOptionsCount(count)) : undefined;

  return (
    <StyledButton isActive={isActive} onClick={onClick}>
      {`${numberWithCommas(count)} Options`}
    </StyledButton>
  );
};

export default OptionsCountButton;