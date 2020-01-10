import React from 'react';
import { Button } from '../styled';
import styled from 'styled-components';
import { numberWithCommas } from '../utils';

type StyledButtonProps = {
  readonly isActive?: boolean;
};

type OptionsCountButtonProps = {
  readonly count: number;
  readonly optionsCount: number;
  readonly setOptionsCount: (count: number) => void;
};

const COLOR_FOCUS = '#fff';
const COLOR_BG_FOCUS = '#FA4280';
const COLOR_BG_HOVER_FOCUS = '#F03876';

const StyledButton = styled(Button)<StyledButtonProps>`
  transition: color 0.115s ease, background-color 0.115s ease;

  ${({ isActive }) =>
    isActive
    && (`
      color: ${COLOR_FOCUS};
      background-color: ${COLOR_BG_FOCUS};
      :hover {
        background-color: ${COLOR_BG_HOVER_FOCUS};
      }
    `)}

  :focus {
    color: ${COLOR_FOCUS} !important;
    background-color: ${COLOR_BG_FOCUS} !important;
  }
`;

const OptionsCountButton: React.FC<OptionsCountButtonProps> = ({
  count,
  optionsCount,
  setOptionsCount
}) => {
  const isActive = !!(count === optionsCount);
  const onClick = !isActive ? (() => setOptionsCount(count)) : undefined;

  return (
    <StyledButton
      onClick={onClick}
      isActive={isActive}
    >
      {`${numberWithCommas(count)} Options`}
    </StyledButton>
  );
};

export default OptionsCountButton;