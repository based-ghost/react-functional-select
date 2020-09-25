import { createThemeOptions } from '../utils';
import { RfsTheme } from '../../../src/theme';
import { mergeDeep } from '../../../src/utils';

// Normalize animation props as be default they are type of styled-component's "FlattenSimpleInterpolation"
const BOUNCE_KEYFRAMES = 'BOUNCE_KEYFRAMES 1.19s ease-in-out infinite';
const FADE_IN_KEYFRAMES = 'FADE_IN_KEYFRAMES 0.225s ease-in-out forwards';

const KEYFRAMES_SOURCE_OBJ = {
  loader: {
    animation: BOUNCE_KEYFRAMES
  },
  menu: {
    animation: FADE_IN_KEYFRAMES
  },
  multiValue: {
    animation: FADE_IN_KEYFRAMES
  },
  icon: {
    clear: {
      animation: FADE_IN_KEYFRAMES
    }
  }
};

export const ThemeEnum = Object.freeze({
  DEFAULT: 'Default',
  LARGE_TEXT: 'Large text',
  DARK_COLORS: 'Dark colors',
  ZERO_BORDER_RADIUS: 'No border-radius'
});

export const ThemeConfigMap = Object.freeze<{ [key: string]: any }>({
  [ThemeEnum.DEFAULT]: undefined,
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
});

export const SELECT_CONTAINER_STYLE = {
  marginTop: '1rem'
};

export const OPTIONS = createThemeOptions(ThemeEnum);
export const THEME_DEFAULTS = mergeDeep(RfsTheme, KEYFRAMES_SOURCE_OBJ);

export const THEME_CONFIG: any = {
  menu: {
    option: {
      selectedColor: '#515151',
      focusedBgColor: '#F5F5F5',
      selectedBgColor: '#F5F5F5'
    }
  }
};