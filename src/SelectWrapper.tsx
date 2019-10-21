import React, { ReactText } from 'react';
import Select from './Select';
import { useTheme } from './hooks';
import { createID, isTouchDevice } from './utils';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { SelectProps, SelectHandle, SelectWrapperProps } from './types';

/**
 * This is the parent component for the react-functional-select tree.
 * Abstraction wrapper that handles theme and default property assignment logic.
 */
const SelectWrapper = React.forwardRef<SelectHandle, SelectWrapperProps>((
  { 
    themeConfig, 
    ...props 
  },
  ref: React.Ref<SelectHandle>,
) => {
  const theme: DefaultTheme = useTheme(themeConfig);
  const menuWidth: ReactText = props.menuWidth || theme.menu.width;
  const blurInputOnSelect: boolean = (typeof props.blurInputOnSelect === 'boolean') ? props.blurInputOnSelect : isTouchDevice();

  const selectProps: SelectProps = {
    ...props,
    menuWidth,
    blurInputOnSelect,
    inputId: createID(props.inputId, props.idSuffix),
    selectId: createID(props.selectId, props.idSuffix),
  };

  return (
    <ThemeProvider theme={theme}>
      <Select ref={ref} {...selectProps} />
    </ThemeProvider>
  );
});

SelectWrapper.displayName = 'SelectWrapper';

export default SelectWrapper;