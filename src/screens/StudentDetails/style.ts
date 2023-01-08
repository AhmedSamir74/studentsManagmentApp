import { COLORS } from '@assets/theme/theme';
import { scaleHeight, scaleWidth, SCREEN_WIDTH } from '@utils/scaling';
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  layout: {
    flex: 1,
  },
  imgCont: {
    borderBottomStartRadius: scaleHeight(15),
    borderBottomEndRadius: scaleHeight(15),
    overflow: 'hidden',
  },
  img: {
    width: SCREEN_WIDTH,
    height: scaleHeight(250),
  },
  subPage: {
    flex: 1,
    marginHorizontal: scaleWidth(15),
  },
  title: {
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(25),
  },
  description: {
    marginStart: scaleWidth(10),
  },
  shareBtn: {
    alignSelf: 'flex-end',
  },
  studentData: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 25,
  },
  chatIcon: {
    alignSelf: 'flex-end',
    margin: 20,
  },
});
