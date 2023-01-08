import images from '@assets/theme/images';
import NetInfo from '@react-native-community/netinfo';
import { scaleHeight, scaleWidth } from '@utils/scaling';
import { strings } from '@localization';
import * as React from 'react';
import { StyleSheet, Modal, View, Image } from 'react-native';
import { CustomText } from '../CustomText/CustomText';
import { CustomButton } from '@components/Form';
import { useEffect, useState } from 'react';
import { CustomLayout } from '../CustomLayout/CustomLayout';

export const NetworkConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(
    true,
  );

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected);
    });
  }, []);

  const onRefresh = () => {
    NetInfo.fetch().then(state => {
      setConnectionStatus(state.isConnected);
    });
  };

  return (
    <Modal animationType="slide" visible={!connectionStatus}>
      <CustomLayout>
        <View style={styles.centeredView}>
          <Image
            source={images.images.offline}
            style={styles.offlineImage}
            resizeMode="contain"
          />
          <CustomText weight="bold" marginTop={32}>
            {strings('noConnection')}
          </CustomText>
          <CustomText marginTop={32}>{strings('checkInternet')}</CustomText>
        </View>
        <CustomButton
          type="primary"
          title={strings('refresh')}
          style={styles.refreshBtn}
          onPress={onRefresh}
        />
      </CustomLayout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  offlineImage: {
    width: scaleWidth(121),
    height: scaleHeight(121),
    alignSelf: 'center',
  },
  refreshBtn: {
    marginBottom: 80,
    alignSelf: 'center',
  },
});
