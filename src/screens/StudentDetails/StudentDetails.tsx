import React, { FC, useRef } from 'react';
import { View } from 'react-native';

import styles from './style';
import { CustomLayout, CustomText, Section } from '@components/common';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '@assets/theme/theme';
import Row from '@components/common/Row';
import { strings } from '../../localization';
import { IOption, IStudent } from 'types';
import FastImage from 'react-native-fast-image';
import images from '@assets/theme/images';
import FirebaseController from '@utils/FirebaseController';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StudentDetailsScreenProp } from 'types/RootStackPrams';
import { RadioGroup } from '@components/Form';
import { STUDENT_STATUS_OPTIONS } from '@utils/constants';

export const StudentDetailsScreen: FC = () => {
  const { params } = useRoute<any>();
  const firebaseController = useRef(new FirebaseController()).current;
  const { navigate } = useNavigation<StudentDetailsScreenProp>();

  const studentDetails: IStudent = params?.student;

  const onStudentStatusChange = (isEnabled: boolean) => {
    firebaseController
      .updateStudent(params?.studentId, {
        isEnabled,
      })
      .then(() => {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: strings('success'),
          text2: strings('statusUpdated'),
        });
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: strings('error'),
          text2: strings('statusFailed'),
        });
        console.log('Error => ', error);
      });
  };

  return (
    <CustomLayout style={styles.layout}>
      <View style={styles.imgCont}>
        <FastImage
          style={styles.img}
          source={{
            uri: studentDetails.image,
            priority: FastImage.priority.normal,
          }}
          defaultSource={images.images.student}
        />
      </View>
      <View style={styles.subPage}>
        <CustomText
          textAlign="center"
          size={20}
          weight="bold"
          style={styles.title}
          color={COLORS.darkGray}>
          {studentDetails.firstName?.toUpperCase()}{' '}
          {studentDetails.lastName?.toUpperCase()}
        </CustomText>
        <Row
          justifyContent="space-between"
          alignItems="center"
          style={styles.studentData}>
          <View>
            <CustomText color={COLORS.darkGray}>{strings('class')}</CustomText>
            <CustomText
              color={COLORS.black}
              marginTop={5}
              style={styles.description}>
              {studentDetails?.class}
            </CustomText>
          </View>

          <View>
            <CustomText color={COLORS.darkGray}>
              {strings('rollNumber')}
            </CustomText>
            <CustomText
              color={COLORS.black}
              marginTop={5}
              style={styles.description}>
              {studentDetails?.rollNumber}
            </CustomText>
          </View>
        </Row>
        <Section title={strings('isEnabled')}>
          <RadioGroup
            initialValue={STUDENT_STATUS_OPTIONS.find(
              value =>
                value.value ===
                (studentDetails.isEnabled ? 'enabled' : 'disabled'),
            )}
            data={STUDENT_STATUS_OPTIONS}
            onSelect={(item: IOption) => {
              onStudentStatusChange(item.value === 'enabled');
            }}
          />
        </Section>
      </View>
      <MaterialCommunityIcons
        name="chat-processing-outline"
        color={COLORS.lightBlue}
        size={55}
        style={styles.chatIcon}
        onPress={() =>
          navigate('ChatRoom', {
            studentId: params?.studentId,
          })
        }
      />
    </CustomLayout>
  );
};
