import { selectIsDark } from '@store/slices/themSlice';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { ISectionProps } from 'types';
import { CustomText } from '..';
import styles from './style';

export const Section = ({
  title,
  subTitleComp,
  children,
  style,
  cardStyle,
}: ISectionProps) => {
  const isDark = useSelector(selectIsDark);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleCont}>
        <CustomText size={16}>{title}</CustomText>
      </View>
      {subTitleComp && subTitleComp()}
      <View
        style={[styles.cardCont, isDark && styles.darkBackground, cardStyle]}>
        {children}
      </View>
    </View>
  );
};
