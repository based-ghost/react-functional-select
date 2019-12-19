import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

type CheckboxProps = {
  readonly label?: string;
  readonly checked: boolean;
  readonly readOnly?: boolean;
  readonly onCheck: (checked: boolean) => void;
};

const BORDER_COLOR = '#ced4da';
const CHECK_MARK_COLOR = '#19A2F8';
const BORDER_COLOR_CHECKED = 'rgba(25, 162, 248, 0.525)';

const LabelSpan = styled.span`
  user-select: none;
  font-style: italic;
  margin-left: 1.6rem;
  color: rgb(102, 102, 102);
`;

const LabelWrapper = styled.label<{ $readOnly?: boolean }>`
  user-select: none;
  position: relative;
  margin-top: 0.5rem;
  display: inline-block;

  ${({ $readOnly }) => $readOnly && css`
    cursor: default;
    pointer-events: none;

    > input {
      opacity: 0;
    }

    > i {
      opacity: 0.5;
    }
  `}
`;

const Input = styled.input`
  top: 0.2em;
  z-index: 3;
  opacity: 0;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  position: absolute;

  :checked ~ i {
    :after,
    :before {
      opacity: 1;
      transition: height 0.38s ease;
    }

    :after {
      height: 0.5rem;
    }

    :before {
      height: 1.2rem;
      transition-delay: 0.15s;
    }
  }

  :checked ~ i {
    border-color: ${BORDER_COLOR_CHECKED};
  }
`;

const CheckIcon = styled.i`
  top: 0.2em;
  z-index: 0;
  width: 1rem;
  height: 1rem;
  position: absolute;
  color: ${BORDER_COLOR};
  box-sizing: border-box;
  border-radius: 0.0625rem;
  background-color: transparent;
  border: 0.125rem solid currentColor;
  transition: border-color 0.38s ease;

  :after,
  :before {
    height: 0;
    opacity: 0;
    content: "";
    width: 0.2rem;
    display: block;
    position: absolute;
    border-radius: 0.25rem;
    transform-origin: left top;
    background-color: ${CHECK_MARK_COLOR};
    transition: opacity 0.38s ease, height 0s linear 0.38s;
  }

  :after {
    left: 0;
    top: 0.3rem;
    transform: rotate(-45deg);
  }

  :before {
    top: 0.65rem;
    left: 0.38rem;
    transform: rotate(-135deg);
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
    <CheckIcon />
    {label && <LabelSpan>{label}</LabelSpan>}
  </LabelWrapper>
));

export default Checkbox;