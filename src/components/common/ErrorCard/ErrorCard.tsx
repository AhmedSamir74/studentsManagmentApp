import { COLORS } from '@assets/theme/theme';
import * as React from 'react';
import { StyleSheet, TextProps, StyleProp, View } from 'react-native';
import { CustomText } from '../CustomText/CustomText';

interface AppTextProps extends TextProps {
  children: any;
  style?: StyleProp<TextProps>;
}

export const ErrorCard = ({ children, style }: AppTextProps) => {
  return (
    <View style={[styles.errorCont, style]}>
      <CustomText color={COLORS.error} textAlign="center">
        {children}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  errorCont: {
    flex: 1,
    justifyContent: 'center',
  },
});
