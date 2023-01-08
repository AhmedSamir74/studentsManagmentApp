import { COLORS } from '@assets/theme/theme';
import { strings } from '@localization';
import { scaleHeight, scaleWidth } from '@utils/scaling';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomText } from '../CustomText/CustomText';

export const EmptySearchCard = () => {
  return (
    <View style={styles.emptySearchCont}>
      <FastImage
        style={styles.emptySearchIcon}
        source={{
          uri: 'https://static.thenounproject.com/png/744760-200.png',
          cache: 'cacheOnly',
        }}
        resizeMode="contain"
      />
      <CustomText size={16} weight="semiBold" color={COLORS.error}>
        {strings('emptySearch')}
      </CustomText>
      <CustomText
        marginTop={5}
        size={16}
        color={COLORS.darkGray}
        textAlign="center">
        {strings('tryAnotherWord')}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  emptySearchCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeight(50),
    marginHorizontal: 15,
  },

  emptySearchIcon: {
    width: scaleWidth(120),
    height: scaleHeight(120),
    marginBottom: scaleHeight(15),
  },
});
