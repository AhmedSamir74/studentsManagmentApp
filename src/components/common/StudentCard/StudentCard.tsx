import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IStudent } from 'types';

import Highlighter from 'react-native-highlight-words';
import { useSelector } from 'react-redux';
import { selectIsDark } from '@store/slices/themSlice';
import { useNavigation } from '@react-navigation/native';
import images from '@assets/theme/images';
import Row from '@components/common/Row';
import { HomeScreenProp } from 'types/RootStackPrams';

import styles from './styles';
import FastImage from 'react-native-fast-image';
import { CustomText } from '../CustomText/CustomText';
import { COLORS } from '@assets/theme/theme';
import { strings } from '@localization';

export const StudentCard = ({
  query,
  student,
}: {
  query: string;
  student: IStudent;
}) => {
  const { navigate } = useNavigation<HomeScreenProp>();
  const isDark = useSelector(selectIsDark);

  const {
    firstName,
    lastName,
    isEnabled,
    class: className,
    rollNumber,
    image,
  } = student;
  return (
    <TouchableOpacity
      onPress={() =>
        navigate('StudentDetails', {
          student: student,
          studentId: student.id,
        })
      }
      activeOpacity={0.7}
      style={[styles.cardCont, isDark && styles.darkCard]}>
      <FastImage
        style={styles.img}
        source={{
          uri: image,
          priority: FastImage.priority.normal,
        }}
        defaultSource={images.images.student}
      />
      <View style={styles.txtCont}>
        <Row justifyContent="space-between" alignItems="center">
          <CustomText numberOfLines={2} size={14} weight="semiBold">
            <Highlighter
              highlightStyle={styles.yellowBG}
              searchWords={[query]}
              textToHighlight={`${firstName} ${lastName}`}
            />
          </CustomText>

          {!isEnabled && (
            <View style={styles.disabledLabel}>
              <CustomText size={12} weight="semiBold" color={COLORS.white}>
                {strings('disabled')}
              </CustomText>
            </View>
          )}
        </Row>
        <CustomText
          numberOfLines={3}
          size={12}
          color={isDark ? COLORS.white : COLORS.darkGray}
          style={styles.descText}>
          {strings('class')}: {className}
          {'\n'}
          {strings('rollNumber')}: {rollNumber}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};
