import React from 'react';
import { Button } from '../styled';
import styled from 'styled-components';
import { numberWithCommas } from '../utils';

type StyledButtonProps = Readonly<{
  isActive?: boolean;
}>;

type OptionsCountButtonProps = Readonly<{
  count: number;
  optionsCount: number;
  setOptionsCount: (count: number) => void;
}>;

const StyledButton = styled(Button)<StyledButtonProps>`
  width: 6.25rem;
  transition: none;

  ${({ isActive }) =>
    isActive
    && (`
      color: #fff;
      background-color: #149DF3;
      :hover {
        background-color: #0A93E9;
      }
    `)}

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
  const isActive = (count === optionsCount);
  const onClick = !isActive ? (() => setOptionsCount(count)) : undefined;

  return (
    <StyledButton onClick={onClick} isActive={isActive}>
      {numberWithCommas(count)}
    </StyledButton>
  );
};

export default OptionsCountButton;