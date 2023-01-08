import images from '@assets/theme/images';
import { CustomText } from '@components/common';
import { strings } from '../../localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StatusBar, Image, ImageBackground, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import styles from './style';
import { IS_NEW_USER_KEY } from '@utils/constants';
import { CustomButton } from '@components/Form';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/RootStackPrams';
import theme from '@assets/theme/theme';

const WELCOME_SLIDER_DATA: object[] = [
  {
    key: '1',
    title: strings('onBoarding.title1'),
    text: strings('onBoarding.description1'),
    image: images.onBoarding.img1,
  },
  {
    key: '2',
    title: strings('onBoarding.title2'),
    text: strings('onBoarding.description2'),
    image: images.onBoarding.img2,
  },
  {
    key: '3',
    title: strings('onBoarding.title3'),
    text: strings('onBoarding.description3'),
    image: images.onBoarding.img3,
  },
];

export const OnBoarding = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    AsyncStorage.setItem(IS_NEW_USER_KEY, 'true');
  }, []);
  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.pageCont}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <CustomText style={styles.imageTitle} textAlign="center">
          {item.title}
        </CustomText>
        <CustomText size={16} style={styles.imageText}>
          {item.text}
        </CustomText>
      </View>
    );
  };

  const onDone = () => {
    navigation.replace('MainNavigator');
  };

  return (
    <ImageBackground
      style={styles.screen}
      source={images.onBoarding.onBoardingBg}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.gradient.topColor}
        translucent
      />
      <CustomButton
        style={styles.getStartBtn}
        title={strings('skip')}
        onPress={onDone}
      />
      <AppIntroSlider
        renderItem={renderItem}
        data={WELCOME_SLIDER_DATA}
        onDone={onDone}
      />
    </ImageBackground>
  );
};
