import {
  Alert,
  Image,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grey, teal} from 'material-ui-colors';
import {ActivityIndicator, IconButton, Text} from 'react-native-paper';
import ActionSheet from 'react-native-actions-sheet';
import React, {createRef} from 'react';
import {getImageUrl, NativeFile} from '../utils';
import requester from '../utils/requester';

const IMAGE_PICKER_OPTIONS = {
  maxHeight: 800,
  maxWidth: 800,
  mediaType: 'photo',
};

const ImagePicker = ({
  setPictureLoading,
  pictureLoading,
  pictureCode,
  setPicture,
  picture,
}) => {
  const actionSheetRef = createRef();

  const onChangePicture = p => {
    actionSheetRef.current?.setModalVisible(false);
    if (pictureLoading) {
      return;
    }
    setPictureLoading(true);
    const file = new NativeFile(p.type, p.fileName, p.uri).get();
    requester
      .upload('parent/student/picture', {
        image_code: pictureCode,
        file,
      })
      .then(res => {
        console.log(res);
        setPicture(file);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setPictureLoading(false);
      });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(IMAGE_PICKER_OPTIONS).then(res => {
          if (res.didCancel) {
            return;
          }
          if (res.errorCode === 'camera_unavailable') {
            Alert.alert('Ошибка!', 'Камера недоступна!');
            return;
          } else if (res.errorCode === 'others') {
            Alert.alert('Ошибка!', res.errorMessage);
            return;
          }
          onChangePicture(res.assets[0]);
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <>
      <ActionSheet ref={actionSheetRef}>
        <View
          style={{
            margin: 20,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              launchImageLibrary(IMAGE_PICKER_OPTIONS).then(res => {
                if (res.didCancel) {
                  return;
                }
                onChangePicture(res.assets[0]);
              });
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name={'image'}
                color={teal[900]}
                size={30}
              />
              <View style={{marginTop: 3}}>
                <Text style={{fontSize: 15, color: teal[900]}}>Галерея</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => requestCameraPermission().then()}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name={'camera'}
                color={teal[900]}
                size={30}
              />
              <View style={{marginTop: 3}}>
                <Text style={{fontSize: 15, color: teal[900]}}>Камера</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      <View style={{position: 'relative'}}>
        <Image
          style={styles.imgProfile}
          source={
            picture
              ? {uri: picture.uri || getImageUrl(picture.path)}
              : require('../assets/no_avatar.jpg')
          }
        />
        {pictureLoading ? (
          <ActivityIndicator
            style={{
              position: 'absolute',
              left: 45,
              top: 65,
            }}
            size={30}
          />
        ) : (
          <View style={styles.iconBtn}>
            <IconButton
              icon="camera"
              color={grey[100]}
              size={20}
              onPress={() => actionSheetRef.current.setModalVisible(true)}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imgProfile: {
    marginVertical: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  iconBtn: {
    position: 'absolute',
    right: -5,
    bottom: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: teal[900],
    zIndex: 1,
  },
});

export default ImagePicker;
