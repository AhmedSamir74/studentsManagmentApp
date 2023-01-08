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
    paddingBottom: scaleHeight(8),
  },
  darkCard: {
    backgroundColor: COLORS.darkGray,
  },
  img: {
    width: scaleWidth(80),
    height: scaleWidth(80),
    borderRadius: 80 / 2,
    marginHorizontal: 10,
    marginTop: 8,
    borderWidth: 0.5,
    borderColor: COLORS.gray,
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
    marginTop: scaleHeight(5),
    textAlign: 'left',
  },
  arrow: {
    alignSelf: 'center',
  },
  nameAndArrowCont: {
    flex: 1,
  },

  disabledLabel: {
    backgroundColor: COLORS.error,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});
