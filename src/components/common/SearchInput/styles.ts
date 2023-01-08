import { COLORS } from '@assets/theme/theme';
import { scaleHeight, scaleWidth } from '@utils/scaling';
import { StyleSheet, I18nManager } from 'react-native';

export default StyleSheet.create({
  searchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: scaleWidth(5),
    borderRadius: 10,
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(20),
  },
  searchInput: {
    flex: 1,
    marginStart: scaleWidth(10),
    paddingVertical: scaleHeight(12),
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
