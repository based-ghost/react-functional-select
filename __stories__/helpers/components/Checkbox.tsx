import { memo } from 'react';
import { hexToRgba } from '../utils';
import styled, { css } from 'styled-components';

type CheckboxProps = Readonly<{
  label?: string;
  checked: boolean;
  readOnly?: boolean;
  onCheck: (checked: boolean) => void;
}>;

const CHECK_COLOR = '#149DF3';
const CHECK_BORDER_COLOR = hexToRgba(CHECK_COLOR, 0.78);

const Label = styled.span`
  user-select: none;
  margin-left: 1.45rem;
`;

const Input = styled.input`
  z-index: 3;
  opacity: 0;
  width: 1em;
  height: 1em;
  cursor: pointer;
  position: absolute;

  :checked ~ i {
    border-color: ${CHECK_BORDER_COLOR};

    :after,
    :before {
      opacity: 1;
      transition: height 0.34s ease;
    }

    :after {
      height: 0.5rem;
    }

    :before {
      height: 1.16rem;
      transition-delay: 0.11s;
    }
  }
`;

const CheckboxWrapper = styled.label<{ isReadOnly?: boolean }>`
  user-select: none;
  position: relative;
  margin-top: 0.5rem;
  align-items: center;
  display: inline-flex;

  ${({ isReadOnly }) =>
    isReadOnly
    && css`
      cursor: default;
      pointer-events: none;

      > i {
        opacity: 0.5;
      }
    `}
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
  transition: border-color 0.34s ease;

  :after,
  :before {
    height: 0;
    opacity: 0;
    content: "";
    width: 0.2rem;
    display: block;
    position: absolute;
    border-radius: 3px;
    transform-origin: left top;
    background-color: ${CHECK_COLOR};
    transition: opacity 0.34s ease, height 0s linear 0.34s;
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

const Checkbox = memo<CheckboxProps>(({
  label,
  onCheck,
  checked,
  readOnly
}) => (
  <CheckboxWrapper isReadOnly={readOnly}>
    <Input
      type='checkbox'
      checked={checked}
      onChange={(e) => onCheck(e.target.checked)}
    />
    <CheckIcon />
    {label && <Label>{label}</Label>}
  </CheckboxWrapper>
));

export default Checkbox;