import type { DefaultTheme } from 'styled-components';
import { BOUNCE_ANIMATION_CSS, FADE_IN_ANIMATION_CSS } from './styled';

const color = {
  border: '#ced4da',
  danger: '#dc3545',
  primary: '#007bff',
  disabled: '#e9ecef',
  placeholder: '#6E7276',
  dangerLight: 'rgba(220, 53, 69, 0.25)'
};

export const DEFAULT_THEME: DefaultTheme = {
  color,
  input: {},
  select: {},
  loader: {
    size: '0.625rem',
    padding: '0.375rem 0.75rem',
    animation: BOUNCE_ANIMATION_CSS,
    color: 'rgba(0, 123, 255, 0.42)'
  },
  icon: {
    color: '#ccc',
    hoverColor: '#A6A6A6',
    padding: '0 14px',
    clear: {
      width: '14px',
      height: '16px',
      animation: FADE_IN_ANIMATION_CSS,
      transition: 'color 0.2s ease-out'
    },
    caret: {
      size: '7px',
      transition: 'transform 0.3s ease-in-out, color 0.2s ease-out'
    }
  },
  control: {
    minHeight: '38px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '3px',
    padding: '2px 8px',
    boxShadow: '0 0 0 0.2rem',
    boxShadowColor: 'rgba(0, 123, 255, 0.25)',
    focusedBorderColor: 'rgba(0, 123, 255, 0.75)',
    transition: 'box-shadow 0.2s ease-out, border-color 0.2s ease-out'
  },
  menu: {
    padding: '0',
    width: '100%',
    margin: '0.35rem 0',
    borderRadius: '3px',
    backgroundColor: '#fff',
    animation: FADE_IN_ANIMATION_CSS,
    boxShadow: '0 0.5em 1em -0.125em rgb(10 10 10 / 12%), 0 0 0 1px rgb(10 10 10 / 4%)',
    option: {
      textAlign: 'left',
      selectedColor: '#fff',
      padding: '0.375rem 0.75rem',
      selectedBgColor: color.primary,
      focusedBgColor: 'rgba(0, 123, 255, 0.15)'
    }
  },
  noOptions: {
    fontSize: '1.25rem',
    margin: '0.25rem 0',
    color: 'hsl(0, 0%, 60%)',
    padding: '0.375rem 0.75rem'
  },
  multiValue: {
    margin: '1px 2px',
    borderRadius: '3px',
    backgroundColor: '#e7edf3',
    animation: FADE_IN_ANIMATION_CSS,
    label: {
      borderRadius: '3px',
      fontSize: '0.825em',
      padding: '1px 0 1px 6px'
    },
    clear: {
      fontWeight: 600,
      padding: '0 6px',
      color: '#a6a6a6',
      fontSize: '0.65em',
      alignSelf: 'center',
      focusColor: color.danger,
      transition: 'color 0.2s ease-out'
    }
  }
};