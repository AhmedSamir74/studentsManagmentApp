import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance, ColorSchemeName } from 'react-native';
import { RootState } from 'store';

type ThemeState = {
  isDark: boolean;
  theme: ColorSchemeName;
};

const slice = createSlice({
  name: 'theme',
  initialState: {
    isDark: Appearance.getColorScheme() === 'dark',
    theme: Appearance.getColorScheme(),
  } as ThemeState,
  reducers: {
    setTheme: (state, { payload: theme }: PayloadAction<ColorSchemeName>) => {
      state.isDark = theme === 'dark';
      state.theme = theme;
    },
  },
});

export const { setTheme } = slice.actions;

export default slice.reducer;

export const selectTheme = (state: RootState) => state.theme.theme;
export const selectIsDark = (state: RootState) => state.theme.isDark;
