import React, {useState} from 'react';
import {View, StyleSheet, Text, Platform, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useAppSelector} from '../utils';
import SellerStudentScreen from './SellerStudentScreen';
import requester from '../utils/requester';

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    width: screen.height > screen.width ? screen.width : screen.height,
    height: screen.height > screen.width ? screen.width : screen.height,
  },
});

function StoreHomeScreen({navigation}) {
  const store = useAppSelector(state => state.app.store);
  const user = useAppSelector(state => state.app.user);

  const [busy, setBusy] = useState(false);

  const readQRCode = async data => {
    if (data.substring(0, 2).toUpperCase() !== 'BS' || data.length !== 34) {
      return;
    }
    try {
      const res = await requester.get('store/student', {
        code: data,
      });
      navigation.navigate('SellerStudentScreen', {
        data: res.payload,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onBarCodeRead = async ({type, data}) => {
    if (
      type !== Platform.select({android: 'QR_CODE', ios: 'org.iso.QRCode'}) ||
      busy
    ) {
      return;
    }
    setBusy(true);
    try {
      await readQRCode(data);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <View
        style={{
          padding: 8,
          flexDirection: 'row',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
        }}>
        <Text>{user.full_name}</Text>
        <Text>{store.balance} c</Text>
      </View>

      <View
        style={{flexGrow: 1, alignItems: 'center', justifyContent: 'center'}}>
        {busy ? (
          <Text>Loading</Text>
        ) : (
          <RNCamera
            onBarCodeRead={onBarCodeRead}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            type={RNCamera.Constants.Type.back}
            style={styles.camera}
          />
        )}
      </View>
    </View>
  );
}

export default StoreHomeScreen;
