import 'styled-components';
import { FlattenSimpleInterpolation } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      border: string;
      danger: string;
      primary: string;
      disabled: string;
      placeholder: string;
      dangerLight: string;
      caretActive?: string;
      iconSeparator?: string;
    };
    select: {
      css?: string | FlattenSimpleInterpolation;
    };
    loader: {
      size: string;
      color: string;
      padding: string;
      animation: string | FlattenSimpleInterpolation;
    };
    icon: {
      color: string;
      padding: string;
      hoverColor: string;
      css?: string | FlattenSimpleInterpolation;
      clear: {
        width: string;
        height: string;
        transition: string;
        animation: string | FlattenSimpleInterpolation;
      };
      caret: {
        size: string;
        transition: string;
      };
    };
    control: {
      height?: string;
      padding: string;
      minHeight: string;
      boxShadow: string;
      transition: string;
      borderWidth: string;
      borderStyle: string;
      borderRadius: string;
      boxShadowColor: string;
      backgroundColor?: string;
      focusedBorderColor: string;
      css?: string | FlattenSimpleInterpolation;
    },
    input: {
      css?: string | FlattenSimpleInterpolation;
    }
    menu: {
      margin: string;
      padding: string;
      boxShadow: string;
      borderRadius: string;
      width: string | number;
      backgroundColor: string;
      css?: string | FlattenSimpleInterpolation;
      animation: string | FlattenSimpleInterpolation;
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
      css?: string | FlattenSimpleInterpolation;
    };
    multiValue: {
      margin: string;
      borderRadius: string;
      backgroundColor: string;
      css?: string | FlattenSimpleInterpolation;
      animation: string | FlattenSimpleInterpolation;
      label: {
        padding: string;
        fontSize: string;
        borderRadius: string;
      };
      clear: {
        padding: string;
        fontSize: string;
        alignItems: string;
        transition: string;
        borderRadius: string;
        fontWeight: string | number;
      }
    }
  }
}