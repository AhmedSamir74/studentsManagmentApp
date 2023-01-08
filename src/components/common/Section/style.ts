import theme from '@assets/theme/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  cardCont: {
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    paddingStart: 16,
    paddingEnd: 23,
    marginTop: 8,
  },
  darkBackground: {
    backgroundColor: theme.colors.darkGray,
  },
  titleCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
