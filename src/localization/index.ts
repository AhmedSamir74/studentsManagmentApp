import { LANG_KEY, THEME_KEY } from './../utils/constants';
import i18n from 'i18n-js';
import { ColorSchemeName, I18nManager } from 'react-native';
import { _retrieveData, _storeData } from '@utils/storageController';
import RNRestart from 'react-native-restart';

import en from './en';
import ar from './ar';
import { store } from '@store/index';
import { setTheme } from '@store/slices/themSlice';
i18n.fallbacks = true;
i18n.translations = { en, ar };

_retrieveData(LANG_KEY).then((language?: string) => {
  if (language === undefined) {
    _storeData(LANG_KEY, 'en');
    i18n.locale = 'en';
    I18nManager.forceRTL(false);
  } else {
    i18n.locale = language;
  }
});

_retrieveData(THEME_KEY).then((theme?: ColorSchemeName) => {
  if (theme === undefined) {
    _storeData(THEME_KEY, 'light');
    store.dispatch(setTheme('light'));
  } else {
    _storeData(THEME_KEY, theme);
    store.dispatch(setTheme(theme));
  }
});

export const changeLanguage = (language: 'ar' | 'en') => {
  _storeData(LANG_KEY, language);
  i18n.locale = language;
  I18nManager.forceRTL(language === 'ar');
  RNRestart.Restart();
};

export const isRTL = I18nManager.isRTL;

export function strings(name: string, params = {}) {
  return i18n.t(name, params);
}

export const getCurrentLanguage = () => i18n.currentLocale();
export const getCurrentLanguageName = () =>
  i18n.currentLocale() === 'en' ? 'english' : 'germany';

export default i18n;
