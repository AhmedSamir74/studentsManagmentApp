import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextProps,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import theme from '@assets/theme/theme';
import { scaleHeight, scaleWidth } from '@utils/scaling';
import { CustomText } from '@components/common';

export interface ButtonProps extends TextProps {
  title?: string;
  type?: 'primary' | 'link';
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  marginTop?: number;
  marginBottom?: number;
  textStyle?: StyleProp<TextStyle>;
  titleSize?: number;
  children?: any;
  underLine?: boolean;
}

export const CustomButton = ({
  disabled,
  title,
  type = 'primary',
  onPress,
  style,
  loading,
  marginTop,
  marginBottom,
  textStyle,
  titleSize,
  children,
  underLine,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === 'primary' && styles.primaryCont,
        disabled && styles.disabled,
        { marginBottom: marginBottom ? scaleHeight(marginBottom) : undefined },
        { marginTop: marginTop ? scaleHeight(marginTop) : undefined },
        style,
      ]}
      onPress={onPress}
      disabled={loading || disabled}
      pressRetentionOffset={{ top: 10, bottom: 10, right: 10, left: 10 }}>
      {loading && (
        <ActivityIndicator
          size={14}
          color={theme.colors.white}
          style={styles.loader}
        />
      )}

      <CustomText
        style={[
          styles.text,
          type === 'link' && styles.linkText,
          underLine && styles.underLineText,
          textStyle,
        ]}
        size={titleSize ? titleSize : 15}>
        {title} {children}
      </CustomText>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: scaleWidth(22),
    paddingVertical: scaleHeight(8),
  },
  primaryCont: {
    backgroundColor: theme.colors.primary,
    height: scaleHeight(50),
  },
  disabled: {
    backgroundColor: theme.colors.gray,
  },
  text: {
    color: theme.colors.white,
    fontFamily: theme.fontFamily.semiBold,
  },
  linkText: {
    color: theme.colors.primary,
  },
  underLineText: {
    textDecorationLine: 'underline',
  },
  loader: {
    marginHorizontal: 10,
  },
});
