import { StyleSheet } from 'react-native';
import { scaleFontSize, scaleHeight } from '@utils/scaling';
import { COLORS, FONT_FAMILIES } from '@assets/theme/theme';

export default StyleSheet.create({
  pageCont: {
    flex: 1,
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    paddingBottom: scaleHeight(30),
    backgroundColor: COLORS.gradient.topColor,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  imageTitle: {
    fontSize: scaleFontSize(20),
    color: COLORS.white,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 11,
  },
  imageText: {
    color: COLORS.lightGray,
    marginHorizontal: 16,
    marginTop: 32,
    lineHeight: 24,
  },

  getStartBtn: {
    position: 'absolute',
    top: 65,
    right: 5,
    zIndex: 1,
    borderColor: COLORS.white,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    height: scaleHeight(26),
  },
  skipText: {
    color: COLORS.white,
    fontFamily: FONT_FAMILIES.semiBold,
  },
});
