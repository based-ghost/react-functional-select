import React from 'react';
import { Button } from './styled';
import { numberWithCommas } from './utils';
import styled, { css } from 'styled-components';

const OptionButton = styled(Button)<{ isActive?: boolean }>`
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

type OptionsCountButtonProps = {
  readonly count: number;
  readonly optionsCount: number;
  readonly handleSetOptionsCount: (count: number) => void;
};

const OptionsCountButton: React.FC<OptionsCountButtonProps> = ({
  count,
  optionsCount,
  handleSetOptionsCount,
}) => (
  <OptionButton
    isActive={Boolean(count === optionsCount)}
    onClick={() => handleSetOptionsCount(count)}
  >
    {`${numberWithCommas(count)} Options`}
  </OptionButton>
);

export default OptionsCountButton;