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

const COLOR_CHECK_MARK = '#149DF3';
const COLOR_BORDER_CHECKED = hexToRgba(COLOR_CHECK_MARK, 0.8);

const Label = styled.span`
  user-select: none;
  margin-left: 1.6rem;
`;

const Input = styled.input`
  z-index: 3;
  opacity: 0;
  width: 1em;
  height: 1em;
  cursor: pointer;
  position: absolute;

  :checked ~ i {
    border-color: ${COLOR_BORDER_CHECKED};

    :after,
    :before {
      opacity: 1;
      transition: height 0.365s ease;
    }

    :after {
      height: 0.5rem;
    }

    :before {
      height: 1.16rem;
      transition-delay: 0.135s;
    }
  }
`;

const CheckboxWrapper = styled.label<CheckboxWrapperProps>`
  user-select: none;
  position: relative;
  margin-top: 0.5rem;
  align-items: center;
  display: inline-flex;

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
  z-index: 0;
  width: 1rem;
  height: 1rem;
  position: absolute;
  border-style: solid;
  border-width: 1.5px;
  box-sizing: border-box;
  border-radius: 0.0625rem;
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.54);
  transition: border-color 0.365s ease;

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
    transition: opacity 0.365s ease, height 0s linear 0.365s;
  }

  :after {
    top: 0.33rem;
    left: 0.01rem;
    transform: rotate(-45deg);
  }

  :before {
    top: 0.68rem;
    left: 0.39rem;
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