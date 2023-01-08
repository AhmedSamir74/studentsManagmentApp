import React from 'react';
import { TextInput, View } from 'react-native';

import styles from './styles';
import { COLORS } from '@assets/theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { strings } from '@localization';
import { ISearchInputProps } from 'types';

export const SearchInput = ({
  searchQuery,
  onChangeText,
}: ISearchInputProps) => {
  return (
    <View style={styles.searchCont}>
      <MaterialCommunityIcons
        name="magnify"
        color={COLORS.lightBlue}
        size={25}
      />
      <TextInput
        value={searchQuery}
        onChangeText={onChangeText}
        placeholder={strings('search')}
        style={styles.searchInput}
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={COLORS.gray}
      />
      {searchQuery ? (
        <MaterialCommunityIcons
          name="close-circle"
          color={COLORS.darkGray}
          size={20}
          onPress={() => onChangeText('')}
        />
      ) : null}
    </View>
  );
};
