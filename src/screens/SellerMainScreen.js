import React, {useState} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useAppSelector} from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  preview: {
    width: 320,
    height: 320,
  },
  topButtons: {
    flex: 1,
    alignItems: 'flex-start',
  },
  bottomButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  flipButton: {
    flex: 1,
    marginTop: 20,
    right: 20,
    alignSelf: 'flex-end',
  },
  recordingButton: {
    marginBottom: 10,
  },
  text: {
    fontSize: 80,
    marginTop: 50,
    textAlign: 'center',
    marginBottom: 80,
  },
  bottomButtonsCamera: {
    marginBottom: 40,
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
});

function SellerMainScreen() {
  const store = useAppSelector(state => state.app.store);

  const [busy, setBusy] = useState(false);

  const readQRCode = data => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.startsWith('BS')) {
          console.log(data);
          Alert.alert('QR', data);
          resolve();
        } else {
          Alert.alert('QR', 'Error!');
          reject();
        }
      }, 1000);
    });
  };

  const onBarCodeRead = async ({type, data}) => {
    if (type !== 'org.iso.QRCode' || busy) {
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
    <View style={styles.container}>
      <Text style={styles.text}>{store.balance} c</Text>

      <View flex={1} justifyContent={'center'} alignItems={'center'}>
        {busy ? (
          <Text>Loading</Text>
        ) : (
          <RNCamera
            onBarCodeRead={onBarCodeRead}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            type={RNCamera.Constants.Type.back}
            style={styles.preview}
          />
        )}
      </View>

      {/* <View style={styles.topButtons}>
          <TouchableOpacity onPress={this.flipCamera} style={styles.flipButton}>
            <Icon name="camera" size={35} color="orange" />
          <MaterialCommunityIcons name="camera" color={''} size={66} style={styles.bottomButtonsCamera}/>
          </TouchableOpacity>
        </View> */}
    </View>
  );
}

export default SellerMainScreen;
