import React from 'react';
import { Button } from './styled';
import { numberWithCommas } from './utils';

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
  <Button
    isActive={!!(count === optionsCount)}
    onClick={() => handleSetOptionsCount(count)}
  >
    {`${numberWithCommas(count)} Options`}
  </Button>
);

export default OptionsCountButton;