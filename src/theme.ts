import { DefaultTheme } from 'styled-components';
import { BOUNCE_ANIMATION_CSS, FADE_IN_ANIMATION_CSS } from './constants/styled';

/**
 * A contextual styled-components DefaultTheme object with default key-value pairs for CSS props.
 */
export default Object.freeze<DefaultTheme>({
  color: {
    border: '#ced4da',
    danger: '#dc3545',
    primary: '#007bff',
    disabled: '#e9ecef',
    placeholder: '#6E7276',
    dangerLight: 'rgba(220, 53, 69, 0.25)'
  },
  input: {},
  select: {},
  loader: {
    size: '0.625rem',
    padding: '0.375rem 0.75rem',
    animation: BOUNCE_ANIMATION_CSS,
    color: 'rgba(0, 123, 255, 0.42)',
  },
  icon: {
    color: '#cccccc',
    hoverColor: '#A6A6A6',
    padding: '0 0.9375rem',
    clear: {
      fontWeight: 900,
      fontSize: '0.85em',
      animation: FADE_IN_ANIMATION_CSS,
      transition: 'color 0.15s ease-in-out',
      fontFamily: 'Helvetica, Arial, sans-serif'
    },
    caret: {
      size: '7px',
      transition: 'transform 0.225s ease-in-out, color 0.15s ease-in-out'
    }
  },
  control: {
    minHeight: '38px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '0.25rem',
    boxShadow: '0 0 0 0.2rem',
    padding: '0.375rem 0.75rem',
    boxShadowColor: 'rgba(0, 123, 255, 0.25)',
    focusedBorderColor: 'rgba(0, 123, 255, 0.75)',
    transition: 'box-shadow 0.15s ease-in-out, border-color 0.15s ease-in-out',
  },
  menu: {
    width: '100%',
    margin: '0.5rem 0',
    padding: '0.15rem 0',
    borderRadius: '0.25rem',
    backgroundColor: '#fff',
    animation: FADE_IN_ANIMATION_CSS,
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 11px rgba(0, 0, 0, 0.1)',
    option: {
      textAlign: 'left',
      selectedColor: '#fff',
      selectedBgColor: '#007bff',
      padding: '0.375rem 0.75rem',
      focusedBgColor: 'rgba(0, 123, 255, 0.20)'
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
    borderRadius: '0.25rem',
    backgroundColor: '#e7edf3',
    animation: FADE_IN_ANIMATION_CSS,
    label: {
      fontSize: '0.825em',
      borderRadius: '0.25rem',
      padding: '1px 2px 1px 6px'
    },
    clear: {
      fontWeight: 700,
      padding: '0 7px',
      fontSize: '0.67em',
      alignItems: 'center',
      borderRadius: '0.25rem',
      transition: 'color 0.15s ease-in-out, background-color 0.15s ease-in-out'
    }
  }
});