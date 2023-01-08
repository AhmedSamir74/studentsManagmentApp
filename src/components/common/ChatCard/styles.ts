import { COLORS } from '@assets/theme/theme';
import { scaleHeight, scaleWidth } from '@utils/scaling';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardCont: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    marginBottom: scaleHeight(15),
    borderRadius: scaleHeight(10),
    overflow: 'hidden',
    paddingVertical: scaleHeight(5),
    justifyContent: 'center',
  },
  darkNewCard: {
    backgroundColor: COLORS.darkGray,
  },
  img: {
    width: scaleWidth(45),
    height: scaleWidth(45),
    borderRadius: 45 / 2,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderColor: COLORS.gray,
    alignSelf: 'center',
  },
  txtCont: {
    flex: 1,
    marginHorizontal: scaleWidth(10),
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(5),
    justifyContent: 'space-between',
  },
  yellowBG: {
    backgroundColor: 'yellow',
  },
  descText: {
    marginTop: scaleHeight(8),
    marginEnd: 65,
  },
  arrow: {
    alignSelf: 'center',
  },
  nameAndArrowCont: {
    flex: 1,
  },
  subTextCont: {
    marginTop: 2,
  },
  rollNumber: {
    marginHorizontal: 5,
  },
});
