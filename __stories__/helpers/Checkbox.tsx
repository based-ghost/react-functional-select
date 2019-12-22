import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

type CheckIconProps = {
  readonly $checked: boolean;
};

type LabelWrapperProps = {
  readonly $readOnly?: boolean;
};

type CheckboxProps = {
  readonly label?: string;
  readonly checked: boolean;
  readonly readOnly?: boolean;
  readonly onCheck: (checked: boolean) => void;
};

const BORDER_COLOR = '#ced4da';
const CHECK_MARK_COLOR = '#19A2F8';
const BORDER_COLOR_CHECKED = 'rgba(25, 162, 248, 0.525)';

const Input = styled.input`
  top: 0.2em;
  z-index: 3;
  opacity: 0;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  position: absolute;
`;

const LabelSpan = styled.span`
  color: #5E5E5E;
  user-select: none;
  font-style: italic;
  margin-left: 1.6rem;
`;

const LabelWrapper = styled.label<LabelWrapperProps>`
  user-select: none;
  position: relative;
  margin-top: 0.5rem;
  display: inline-block;

  ${({ $readOnly }) =>
    $readOnly &&
    css`
      cursor: default;
      pointer-events: none;
      > i {
        opacity: 0.5;
      }
    `}
`;

const CheckIcon = styled.i<CheckIconProps>`
  top: 0.2em;
  z-index: 0;
  width: 1rem;
  height: 1rem;
  position: absolute;
  border-style: solid;
  box-sizing: border-box;
  border-width: 0.125rem;
  border-radius: 0.0625rem;
  background-color: transparent;
  transition: border-color 0.38s ease;
  border-color: ${({ $checked }) => $checked ? BORDER_COLOR_CHECKED : BORDER_COLOR};

  :after,
  :before {
    height: 0;
    content: "";
    width: 0.2rem;
    display: block;
    position: absolute;
    border-radius: 0.25rem;
    transform-origin: left top;
    background-color: ${CHECK_MARK_COLOR};
    opacity: ${({ $checked }) => $checked ? 1 : 0};
    transition: ${({ $checked }) => $checked ? 'height 0.38s ease' : 'opacity 0.38s ease, height 0s linear 0.38s'};
  }

  :after {
    left: 0;
    top: 0.3rem;
    transform: rotate(-45deg);
    ${({ $checked }) => $checked && css`height: 0.5rem;`};
  }

  :before {
    top: 0.65rem;
    left: 0.38rem;
    transform: rotate(-135deg);

    ${({ $checked }) =>
      $checked &&
      css`
        height: 1.16rem;
        transition-delay: 0.15s;
      `};
  }
`;

const Checkbox = React.memo<CheckboxProps>(({
  label,
  onCheck,
  checked,
  readOnly,
}) => (
  <LabelWrapper $readOnly={readOnly}>
    <Input
      type='checkbox'
      checked={checked}
      onChange={(e: ChangeEvent<HTMLInputElement>): void => onCheck(e.target.checked)}
    />
    <CheckIcon $checked={checked} />
    {label && <LabelSpan>{label}</LabelSpan>}
  </LabelWrapper>
));

export default Checkbox;