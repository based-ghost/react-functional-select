import React from 'react';
import { Button } from '../styled';
import { numberWithCommas } from '../utils';
import styled, { css } from 'styled-components';

type OptionsCountButtonProps = Readonly<{
  count: number;
  optionsCount: number;
  setOptionsCount: (count: number) => void;
}>;

const StyledButton = styled(Button)<{ isActive?: boolean }>`
  width: 6rem;
  transition: none;
  min-width: 6rem !important;

  ${({ isActive }) =>
    isActive
    && css`
      color: #fff;
      background-color: #149DF3;

      :hover {
        background-color: #0A93E9;
      }
    `}

  :focus {
    color: #fff !important;
    background-color: #149DF3 !important;
  }
`;

const OptionsCountButton: React.FC<OptionsCountButtonProps> = ({
  count,
  optionsCount,
  setOptionsCount
}) => {
  const isActive = count === optionsCount;
  const onClick = () => !isActive && setOptionsCount(count);

  return (
    <StyledButton
      onClick={onClick}
      isActive={isActive}
    >
      {numberWithCommas(count)}
    </StyledButton>
  );
};

export default OptionsCountButton;