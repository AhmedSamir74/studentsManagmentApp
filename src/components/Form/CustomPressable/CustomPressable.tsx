import React, { FC } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface IPressableProps {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean | null;
  style?: StyleProp<ViewStyle>;
  [prop: string]: any;
}
export const CustomPressable: FC<IPressableProps> = ({
  onPress,
  style,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={props?.disabled}
      onPress={onPress}
      style={style}
      activeOpacity={0.6}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};
