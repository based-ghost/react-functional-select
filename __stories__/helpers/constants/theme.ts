import { Theme } from '../../../src/Select';
import { createThemeOptions } from '../utils';
import { mergeDeep } from '../../../src/utils';
import { DEFAULT_THEME } from '../../../src/theme';

// Normalize animation props as be default they are type of styled-component's "FlattenSimpleInterpolation"
const _bounceKeyframes = 'BOUNCE_KEYFRAMES 1.19s ease-in-out infinite';
const _fadeInKeyframes = 'FADE_IN_KEYFRAMES 0.225s ease-in-out forwards';

const _themeAnimations: Theme = {
  loader: {
    animation: _bounceKeyframes
  },
  menu: {
    animation: _fadeInKeyframes
  },
  multiValue: {
    animation: _fadeInKeyframes
  },
  icon: {
    clear: {
      animation: _fadeInKeyframes
    }
  }
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
export const THEME_DEFAULTS = mergeDeep(DEFAULT_THEME, _themeAnimations);

export const THEME_CONFIG: Theme = {
  menu: {
    option: {
      selectedColor: '#515151',
      focusedBgColor: '#F5F5F5',
      selectedBgColor: '#F5F5F5'
    }
  }
};