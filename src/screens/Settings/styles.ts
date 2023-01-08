import { scaleHeight, scaleWidth } from '@utils/scaling';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  layout: {
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(50),
  },
  langCont: {
    flex: 1,
    borderWidth: 1,
  },
});
