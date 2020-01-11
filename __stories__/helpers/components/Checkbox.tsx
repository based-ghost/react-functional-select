import React, { ChangeEvent } from 'react';
import { hexToRgba } from '../utils';
import styled from 'styled-components';

type CheckboxWrapperProps = {
  readonly isReadOnly?: boolean;
};

type CheckboxProps = {
  readonly label?: string;
  readonly checked: boolean;
  readonly readOnly?: boolean;
  readonly onCheck: (checked: boolean) => void;
};

const COLOR_LABEL = '#5E5E5E';
const COLOR_BORDER = '#ced4da';
const COLOR_CHECK_MARK = '#FA4280';
const COLOR_BORDER_CHECKED = hexToRgba(COLOR_CHECK_MARK, 0.6); // rgba(250, 66, 128, 0.6)

const Label = styled.span`
  user-select: none;
  font-style: italic;
  margin-left: 1.6rem;
  color: ${COLOR_LABEL};
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
    border-color: ${COLOR_BORDER_CHECKED};

    :after,
    :before {
      opacity: 1;
      transition: height 0.38s ease;
    }

    :after {
      height: 0.5rem;
    }

    :before {
      height: 1.16rem;
      transition-delay: 0.15s;
    }
  }
`;

const CheckboxWrapper = styled.label<CheckboxWrapperProps>`
  user-select: none;
  position: relative;
  margin-top: 0.5rem;
  display: inline-block;

  ${({ isReadOnly }) =>
    isReadOnly
    && (`
      cursor: default;
      pointer-events: none;
      > i {
        opacity: 0.5;
      }
    `)}
`;

const CheckIcon = styled.i`
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
  border-color: ${COLOR_BORDER};

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
    background-color: ${COLOR_CHECK_MARK};
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
  readOnly
}) => (
  <CheckboxWrapper isReadOnly={readOnly}>
    <Input
      type='checkbox'
      checked={checked}
      onChange={(e: ChangeEvent<HTMLInputElement>): void => onCheck(e.target.checked)}
    />
    <CheckIcon />
    {label && <Label>{label}</Label>}
  </CheckboxWrapper>
));

export default Checkbox;