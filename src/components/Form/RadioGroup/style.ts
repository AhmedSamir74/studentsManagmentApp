import theme from '@assets/theme/theme';
import { scaleHeight } from '@utils/scaling';
import { StyleSheet } from 'react-native';

const { lightGray, lightBlue, background } = theme.colors;
export default StyleSheet.create({
  sheetWrapper: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  sheetContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
  },
  pickerSheetContainer: {
    paddingHorizontal: 0,
  },
  itemCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: lightGray,
  },
  darkItemCont: {
    borderBottomColor: background.dark,
  },
  button: {
    marginTop: 15,
  },
  checkBox: {
    width: scaleHeight(24),
    height: scaleHeight(24),
    borderRadius: scaleHeight(24) / 2,
    borderWidth: 1,
    borderColor: lightGray,
    marginEnd: 15,
    backgroundColor: lightGray,
  },
  activeCheckBox: {
    borderColor: lightBlue,
    borderWidth: 6,
  },
});
