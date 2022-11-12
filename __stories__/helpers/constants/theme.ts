import type { Theme } from '../../../src';
import { createThemeOptions } from '../utils';
import { mergeDeep } from '../../../src/utils';
import { DEFAULT_THEME } from '../../../src/constants';

// Normalize animation props as be default they are type of styled-component's "FlattenSimpleInterpolation"
const FADE_IN_KEYFRAMES_STR = 'FADE_IN_KEYFRAMES 0.25s ease-in-out';
const BOUNCE_KEYFRAMES_STR = 'BOUNCE_KEYFRAMES 1.19s ease-in-out infinite';

const THEME_ANIMATIONS: Theme = {
  loader: {
    animation: BOUNCE_KEYFRAMES_STR
  },
  menu: {
    animation: FADE_IN_KEYFRAMES_STR
  },
  multiValue: {
    animation: FADE_IN_KEYFRAMES_STR
  },
  icon: {
    clear: {
      animation: FADE_IN_KEYFRAMES_STR
    }
  },
};

export const ThemeEnum = {
  DEFAULT: 'Default',
  LARGE_TEXT: 'Large text',
  DARK_COLORS: 'Dark colors',
  ZERO_BORDER_RADIUS: 'No border-radius'
};

export const ThemeConfigMap: Theme = {
  [ThemeEnum.DEFAULT]: undefined as any,
  [ThemeEnum.DARK_COLORS]: {
    color: {
      border: '#A8AEB4',
      primary: '#555555'
    },
    select: {
      css: 'color: #000;'
    },
    control: {
      boxShadowColor: 'rgba(85, 85, 85, 0.25)',
      focusedBorderColor: 'rgba(85, 85, 85, 0.75)'
    },
    icon: {
      color: '#A6A6A6'
    },
    menu: {
      option: {
        selectedColor: '#fff',
        selectedBgColor: '#555555',
        focusedBgColor: 'rgba(85, 85, 85, 0.225)'
      }
    }
  },
  [ThemeEnum.LARGE_TEXT]: {
    select: {
      css: 'font-size: 1.25rem;'
    }
  },
  [ThemeEnum.ZERO_BORDER_RADIUS]: {
    control: {
      borderRadius: '0'
    },
    menu: {
      borderRadius: '0'
    }
  }
};

export const THEME_OPTIONS = createThemeOptions(ThemeEnum);
export const THEME_DEFAULTS = mergeDeep(DEFAULT_THEME, THEME_ANIMATIONS);

export const THEME_CONFIG: Theme = {
  menu: {
    option: {
      selectedColor: '#515151',
      focusedBgColor: '#F5F5F5',
      selectedBgColor: '#F5F5F5'
    }
  }
};