import {DefaultTheme, DarkTheme} from '@react-navigation/native';
export const LIGHT_COLORS = {
  primary: '#E50914',
  background: '#F2F7FF',
  text: '#000000',
  grey:'grey',
  cardbg:'white',
  rating:'#fdcc0d'
};
export const DARK_COLORS = {
  primary: '#E50914',
  background: '#222831',
  text: '#ffffff',
  grey:'grey',
  cardbg:'black',
  rating:'#fdcc0d'
};

export const ThemeLight = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...LIGHT_COLORS,
  },
};
export const ThemeDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...DARK_COLORS,
  },
};
