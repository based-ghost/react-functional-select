import 'styled-components';
import { FlattenSimpleInterpolation } from 'styled-components';

type AnimationCSS = string | FlattenSimpleInterpolation;

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      border: string;
      danger: string;
      primary: string;
      disabled: string;
      textColor?: string;
      placeholder: string;
      dangerLight: string;
      caretActive?: string;
      iconSeparator?: string;
    };
    select: {
      fontSize?: string;
    };
    loader: {
      size: string;
      color: string;
      padding: string;
      animation: AnimationCSS;
    };
    icon: {
      color: string;
      padding: string;
      hoverColor: string;
      clear: {
        fontSize: string;
        fontFamily: string;
        transition: string;
        animation: AnimationCSS;
        fontWeight: string | number;
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
    },
    menu: {
      margin: string;
      padding: string;
      boxShadow: string;
      borderRadius: string;
      width: string | number;
      backgroundColor: string;
      animation: AnimationCSS;
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
    multiValue: {
      margin: string;
      borderRadius: string;
      backgroundColor: string;
      animation: AnimationCSS;
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