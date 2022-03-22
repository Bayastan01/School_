import React, {useState} from 'react';
import {View, Text, Platform, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useAppDispatch, useAppSelector} from '../utils';
import requester from '../utils/requester';
import numberSeparator from 'number-separator';
import {ActivityIndicator} from 'react-native-paper';
import {incDriverBalance} from '../stores/appStore';
import {errorSound, successSound} from '../App';

const screen = Dimensions.get('screen');
const minSize =
  Math.floor(screen.height > screen.width ? screen.width : screen.height) - 24;

function DriverHomeScreen() {
  const driver = useAppSelector(state => state.app.driver);
  const user = useAppSelector(state => state.app.user);

  const dispatch = useAppDispatch();

  const [busy, setBusy] = useState(false);

  const readQRCode = async data => {
    if (data.substring(0, 2).toUpperCase() !== 'BS') {
      return;
    }
    try {
      const res = await requester.post('driver/student', {
        code: data,
        sum: 10,
      });
      dispatch(incDriverBalance(res.payload.amount));
      successSound.play();
    } catch (e) {
      console.log(e.status);
      errorSound.play();
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
        <View>
          <Text>{user.full_name}</Text>
          <Text>{driver.state_number}</Text>
          {/* TODO: QR card payments*/}
        </View>
        <Text style={{fontSize: 24}}>
          {numberSeparator(driver.balance)}{' '}
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
              type={RNCamera.Constants.Type.front}
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

export default DriverHomeScreen;
