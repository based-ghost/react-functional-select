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
    inputId,
    selectId,
    idSuffix,
    menuWidth,
    themeConfig,
    blurInputOnSelect,
    ...rest 
  },
  ref: React.Ref<SelectHandle>,
) => {
  const theme: DefaultTheme = useTheme(themeConfig);
  const menuWidth2: ReactText = menuWidth || theme.menu.width;
  const blurInputOnSelect2: boolean = (typeof blurInputOnSelect === 'boolean') ? blurInputOnSelect : isTouchDevice();

  const selectProps: SelectProps = {
    ...rest,
    idSuffix,
    menuWidth: menuWidth2,
    blurInputOnSelect: blurInputOnSelect2,
    inputId: createID(inputId, idSuffix),
    selectId: createID(selectId, idSuffix),
  };

  return (
    <ThemeProvider theme={theme}>
      <Select ref={ref} {...selectProps} />
    </ThemeProvider>
  );
});

SelectWrapper.displayName = 'SelectWrapper';

export default SelectWrapper;