import { StyleSheet } from 'react-native';
import { scale, scaleHeight } from '@utils/scaling';
import theme from '@assets/theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: scale(15),
    paddingBottom: scaleHeight(15),
  },
  safeAreaView: {
    flex: 1,
    paddingTop: 5,
  },
  flexGrowOne: {
    flexGrow: 1,
  },
  lightBackground: {
    backgroundColor: theme.colors.background.light,
  },
  darkBackground: {
    backgroundColor: theme.colors.background.dark,
  },
});
