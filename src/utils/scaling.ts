import { Dimensions, PixelRatio, Platform } from 'react-native';
export const { width, height } = Dimensions.get('window');
export const guidelineBaseWidth = 375;
export const guidelineBaseHeight = 812;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const scale = (size: number) => {
  return (width / guidelineBaseWidth) * size;
};
export const scaleHeight = (size: number) => {
  return (height / guidelineBaseHeight) * size;
};
export const scaleWidth = (size: number, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

export const scaleFontSize = (size: number) => {
  const newSize = size * (width / guidelineBaseWidth);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
