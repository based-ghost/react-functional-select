import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      accent: string;
      border: string;
      invalid: string;
      disabled: string;
      textColor?: string;
      placeholder: string;
      caretActive?: string;
      iconSeparator?: string;
    };
    select: {
      fontSize?: string;
    };
    loader: {
      size: string;
      color: string;
      opacity: string;
      padding: string;
    };
    icon: {
      color: string;
      padding: string;
      hoverColor: string;
      clear: {
        fontSize: string;
        fontFamily: string;
        transition: string;
        fontWeight: string | number;
      };
      caret: {
        size: string;
        transition: string;
      };
    };
    control: {
      height: string;
      padding: string;
      boxShadow: string;
      transition: string;
      borderWidth: string;
      borderStyle: string;
      borderRadius: string;
      backgroundColor?: string;
    },
    menu: {
      margin: string;
      padding: string;
      boxShadow: string;
      borderRadius: string;
      width: string | number;
      backgroundColor: string;
      option: {
        padding: string;
        textAlign: string;
        selectedColor: string;
        focusedBgColor: string;
        selectedBgColor: string;
      };
    };
    noOptions: {
      color: string;
      margin: string;
      padding: string;
      fontSize: string;
    };
  };
}