import React from 'react';
import { Button } from './styled';
import styled from 'styled-components';
import { numberWithCommas } from './utils';

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

  ${({ isActive }) =>
    isActive
    && (`
      color: #fff;
      background-color: #E52D6B;
      :hover {
        background-color: #D8205E;
      }
    `)}

  :focus {
    color: #fff !important;
    background-color: #E52D6B !important;
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