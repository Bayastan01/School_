import React, {useState} from 'react';
import {View, Text, Platform, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useAppSelector} from '../utils';
import SellerStudentScreen from './SellerStudentScreen';
import requester from '../utils/requester';
import numberSeparator from 'number-separator';
import {ActivityIndicator} from 'react-native-paper';

const screen = Dimensions.get('screen');
const minSize =
  Math.floor(screen.height > screen.width ? screen.width : screen.height) - 24;

function StoreHomeScreen({navigation}) {
  const store = useAppSelector(state => state.app.store);
  const user = useAppSelector(state => state.app.user);

  const [busy, setBusy] = useState(false);

  const readQRCode = async data => {
    if (data.substring(0, 2).toUpperCase() !== 'BS') {
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
      console.log(e.status);
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
    <View flex={1}>
      <View
        style={{
          padding: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text>{user.full_name}</Text>
        <Text style={{fontSize: 24}}>
          {numberSeparator(store.balance)}{' '}
          <Text style={{textDecorationLine: 'underline'}}>с</Text>
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {busy ? (
          <ActivityIndicator />
        ) : (
          <View style={{padding: 12}}>
            <RNCamera
              onBarCodeRead={onBarCodeRead}
              barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
              type={RNCamera.Constants.Type.back}
              style={{
                width: minSize,
                height: minSize,
                borderRadius: 12,
                overflow: 'hidden',
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#808080',
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

export default StoreHomeScreen;
