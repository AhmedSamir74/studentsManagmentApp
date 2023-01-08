import React from 'react';

import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('react-native-highlight-words', () => 'Text');

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => ({ theme: 'light', isDark: 'false' })),
}));

const mockedFirestoreCollection = jest.fn();
jest.mock('@react-native-firebase/firestore', () => () => {
  return {
    collection: mockedFirestoreCollection,
    settings: mockedFirestoreCollection,
  };
});

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigationState: mockedNavigate,
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: mockedNavigate,
      addListener: mockedNavigate,
      dispatch: mockedNavigate,
    }),
    useFocusEffect: mockedNavigate,
    useRoute: jest.fn(() => ({
      params: {
        animateSplash: false,
      },
    })),
    addListener: jest.fn().mockImplementation((event, callback) => {
      callback();
      return {
        remove: jest.fn(),
      };
    }),
  };
});
