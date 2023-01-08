import React, { FC, useCallback, useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator, Animated, Image } from 'react-native';
import images from '@assets/theme/images';
import { useNavigation } from '@react-navigation/core';

import styles from './style';
import { CustomText } from '@components/common';
import theme from '@assets/theme/theme';
import { IS_NEW_USER_KEY } from '@utils/constants';
import { RootStackParamList } from 'types/RootStackPrams';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDynamicLinks } from '@hooks/useDynamicLinks';

type loadingScreenProp = StackNavigationProp<RootStackParamList, 'Loading'>;
export const LoadingScreen: FC = () => {
  useDynamicLinks();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<loadingScreenProp>();
  const isNewUser = useCallback(async () => {
    let isNew = true;
    await AsyncStorage.getItem(IS_NEW_USER_KEY, (_err, result: any) => {
      if (result !== null) {
        isNew = false;
      }
    });
    return isNew;
  }, []);

  const navigateUser = async () => {
    const returnedNewUser = await isNewUser();
    if (returnedNewUser) {
      navigation.replace('OnBoarding');
    } else {
      navigation.replace('MainNavigator');
    }
  };

  useEffect(() => {
    navigateUser();
  }, []);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <LinearGradient
      colors={[
        theme.colors.gradient.topColor,
        theme.colors.gradient.bottomColor,
      ]}
      style={styles.linearGradient}>
      {
        <>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [150, 0], // 0 : 150, 0.5 : 75, 1 : 0
                  }),
                },
              ],
            }}>
            <Animated.View style={[styles.textCont, { opacity: fadeAnim }]}>
              <CustomText
                weight="bold"
                size={35}
                textAlign="center"
                marginBottom={20}>
                Student Managment App
              </CustomText>
              <CustomText size={25} textAlign="center">
                Leading the way
              </CustomText>
            </Animated.View>
            <Image
              source={images.images.roundedBGPng}
              style={styles.androidImg}
              resizeMode="contain"
            />
          </Animated.View>
          <ActivityIndicator
            size="large"
            color={theme.colors.secondary}
            style={styles.indicator}
          />
        </>
      }
    </LinearGradient>
  );
};
