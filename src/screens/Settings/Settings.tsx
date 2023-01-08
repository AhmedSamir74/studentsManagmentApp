import React from 'react';
import { CustomLayout, Section } from '@components/common';
import styles from './styles';
import { LANGUAGES_OPTIONS, THEMES_OPTIONS, THEME_KEY } from '@utils/constants';
import {
  changeLanguage,
  getCurrentLanguage,
  strings,
} from '../../localization';
import { IOption } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setTheme } from '@store/slices/themSlice';
import { RadioGroup } from '@components/Form';
import { _storeData } from '@utils/storageController';

export const SettingsScreen = () => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  return (
    <CustomLayout style={styles.layout}>
      <Section title={strings('languages.title')}>
        <RadioGroup
          initialValue={LANGUAGES_OPTIONS.find(
            value => value.value === getCurrentLanguage(),
          )}
          data={LANGUAGES_OPTIONS}
          onSelect={(item: IOption) => {
            changeLanguage(item.value);
          }}
        />
      </Section>

      <Section title={strings('themes.title')}>
        <RadioGroup
          initialValue={THEMES_OPTIONS.find(value => value.value === theme)}
          data={THEMES_OPTIONS}
          onSelect={(item: IOption) => {
            dispatch(setTheme(item.value));
            _storeData(THEME_KEY, item.value);
          }}
        />
      </Section>
    </CustomLayout>
  );
};
