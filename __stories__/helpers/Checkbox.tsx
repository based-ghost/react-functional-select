import React from 'react';
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
}) => (
  <Label $readOnly={readOnly}>
    <Input
      type='checkbox'
      checked={checked}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheck(e.target.checked)}
    />
    {label && <span>{label}</span>}
  </Label>
);

export default Checkbox;