import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IChatCardProps } from 'types';

import Highlighter from 'react-native-highlight-words';
import { useSelector } from 'react-redux';
import { selectIsDark } from '@store/slices/themSlice';
import { useNavigation } from '@react-navigation/native';
import images from '@assets/theme/images';
import Row from '@components/common/Row';
import { ChatsListScreenProp } from 'types/RootStackPrams';

import styles from './styles';
import FastImage from 'react-native-fast-image';
import { CustomText } from '../CustomText/CustomText';
import { COLORS } from '@assets/theme/theme';
import moment from 'moment';
import { strings } from '@localization';

export const ChatCard = ({ query, chat }: IChatCardProps) => {
  const { navigate } = useNavigation<ChatsListScreenProp>();
  const isDark = useSelector(selectIsDark);

  return (
    <TouchableOpacity
      onPress={() =>
        navigate('ChatRoom', {
          studentId: chat.studentId,
        })
      }
      activeOpacity={0.7}
      style={[styles.cardCont, isDark && styles.darkNewCard]}>
      <FastImage
        style={styles.img}
        source={{
          uri: chat?.studentImage,
          priority: FastImage.priority.normal,
        }}
        defaultSource={images.images.student}
      />
      <Row style={styles.nameAndArrowCont} justifyContent="space-between">
        <View style={styles.txtCont}>
          <Row justifyContent="space-between" alignItems="center">
            <CustomText numberOfLines={1} size={13} weight="semiBold">
              <Highlighter
                highlightStyle={styles.yellowBG}
                searchWords={[query]}
                textToHighlight={chat?.studentName}
              />
            </CustomText>
            {chat?.createdAt && (
              <CustomText size={10} color={COLORS.darkGray}>
                {moment(parseInt(chat.createdAt, 10)).format('hh:mm A')}
              </CustomText>
            )}
          </Row>
          <Row alignItems="center" style={styles.subTextCont}>
            <CustomText size={10} color={isDark ? COLORS.white : COLORS.black}>
              {strings('class')} {chat.class} -
            </CustomText>
            <CustomText
              size={10}
              color={isDark ? COLORS.white : COLORS.black}
              style={styles.rollNumber}>
              {strings('rollNumber')} {chat.rollNumber}
            </CustomText>
          </Row>
          <CustomText
            numberOfLines={1}
            size={12}
            color={isDark ? COLORS.white : COLORS.darkGray}
            style={styles.descText}>
            {chat.lastMessage}
          </CustomText>
        </View>
      </Row>
    </TouchableOpacity>
  );
};
