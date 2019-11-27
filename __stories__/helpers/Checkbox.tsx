import React, { ChangeEvent } from 'react';
import { Label } from './styled';
import styled from 'styled-components';

type CheckboxProps = {
  readonly label?: string;
  readonly checked: boolean;
  readonly readOnly?: boolean;
  readonly onCheck: (checked: boolean) => void;
};

const Input = styled.input`
  cursor: default;
  display: inline-block;
  box-sizing: border-box;
  background-color: initial;
  -webkit-appearance: checkbox;
  margin: 0.1875rem 0.1875rem 0.1875rem 0.25rem;
`;

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onCheck,
  readOnly,
}) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => onCheck(e.target.checked);

  return (
    <Label $readOnly={readOnly}>
      <Input
        type='checkbox'
        checked={checked}
        onChange={handleOnChange}
      />
      {label && <span>{label}</span>}
    </Label>
  );
};

export default Checkbox;