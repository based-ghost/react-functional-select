import { Button } from '../styled';
import { numberWithCommas } from '../utils';
import styled, { css } from 'styled-components';

import type { FunctionComponent } from 'react';

type OptionsCountButtonProps = Readonly<{
  count: number;
  optionsCount: number;
  setOptionsCount: (count: number) => void;
}>;

const StyledButton = styled(Button)<{ isActive?: boolean }>`
  width: 6.25rem;
  transition: none;

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

const OptionsCountButton: FunctionComponent<OptionsCountButtonProps> = ({
  count,
  optionsCount,
  setOptionsCount
}) => {
  const isActive = count === optionsCount;
  const onClick = !isActive ? () => setOptionsCount(count) : undefined;

  return (
    <StyledButton onClick={onClick} isActive={isActive}>
      {numberWithCommas(count)}
    </StyledButton>
  );
};

export default OptionsCountButton;