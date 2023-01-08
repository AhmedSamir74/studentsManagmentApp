import React, { useState } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { scaleHeight } from '@utils/scaling';
import { COLORS } from '@assets/theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomPressable } from '@components/Form';

interface Props {
  style?: StyleProp<ViewStyle>;
  initialValue?: boolean;
  onChange?: (value: boolean) => void;
}

const Checkbox = ({ initialValue, onChange, style }: Props) => {
  const [isChecked, setIsChecked] = useState(initialValue || false);

  const onToggle = () => {
    onChange?.(!isChecked);
    setIsChecked(prevState => !prevState);
  };

  return (
    <CustomPressable
      style={[styles.container, isChecked && styles.activeContainer, style]}
      onPress={onToggle}>
      {isChecked && (
        <MaterialCommunityIcons name="check" color={COLORS.white} size={20} />
      )}
    </CustomPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(24),
    width: scaleHeight(24),
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeContainer: {
    backgroundColor: COLORS.lightBlue,
  },
});

export default Checkbox;
