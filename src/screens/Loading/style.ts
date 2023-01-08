import { scaleHeight, SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/scaling';
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingTop: scaleHeight(10),
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignSelf: 'center',
  },
  androidImg: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.85,
    alignSelf: 'center',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: SCREEN_HEIGHT * 0.5,
  },
  textCont: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: SCREEN_HEIGHT * 0.25,
  },
});
