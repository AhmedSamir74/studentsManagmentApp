import theme from '@assets/theme/theme';
import { selectIsDark } from '@store/slices/themSlice';
import React, { FC } from 'react';
import {
  View,
  ScrollView,
  StyleProp,
  ViewStyle,
  StatusBar,
  ColorSchemeName,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';

import styles from './styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
  statusBarBG?: ColorSchemeName;
}

export const CustomLayout: FC<Props> = ({ style, scrollEnabled, children }) => {
  const isDark = useSelector(selectIsDark);

  return (
    <SafeAreaView
      style={[
        styles.safeAreaView,
        isDark ? styles.darkBackground : styles.lightBackground,
      ]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.white}
        translucent
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 15 : 0}
        style={styles.flexGrowOne}>
        {scrollEnabled ? (
          <ScrollView
            contentContainerStyle={[styles.scrollViewContainer, style]}
            style={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.container, style]}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
