import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import MainNavigation from './MainNavigation';
import { NetworkConnection } from '@components/common';
import { selectIsDark } from '@store/slices/themSlice';
import { useSelector } from 'react-redux';
import theme from '@assets/theme/theme';

const AppNavigation = () => {
  const isDark = useSelector(selectIsDark);
  const newDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background.light,
    },
  };

  const newDarkDefaultTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: theme.colors.background.dark,
    },
  };
  return (
    <NavigationContainer theme={isDark ? newDarkDefaultTheme : newDefaultTheme}>
      <MainNavigation />
      <NetworkConnection />
    </NavigationContainer>
  );
};

export default AppNavigation;
