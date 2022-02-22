import React, {createRef, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {
  Button,
  TextInput,
  IconButton,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import {grey, teal} from 'material-ui-colors';
import requester from '../utils/requester';
import ActionSheet from 'react-native-actions-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {NativeFile} from '../utils';

const IMAGE_PICKER_OPTIONS = {
  maxHeight: 800,
  maxWidth: 800,
  mediaType: 'photo',
};

const AddStudentScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [limit, setLimit] = useState('');

  const [pictureCode] = useState(Math.floor(Date.now() / 1000).toString());
  const [pictureLoading, setPictureLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [busy, setBusy] = useState(false);

  const actionSheetRef = createRef();

  const save = () => {
    if (busy) {
      return;
    }
    setBusy(true);
    requester
      .post('parent/student', {
        full_name: fullName,
        image_code: pictureCode,
        limit: limit.length === 0 ? 0 : +limit,
      })
      .then(() => {
        navigation.goBack();
      })
      .finally(() => {
        setBusy(false);
      });
  };

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
          <TouchableOpacity
            onPress={() => {
              launchCamera(IMAGE_PICKER_OPTIONS).then(res => {
                if (res.didCancel) {
                  return;
                }
                if (res.errorCode === 'camera_unavailable') {
                  Alert.alert('Ошибка!', 'Камера недоступна!');
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
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View style={{position: 'relative'}}>
          <Image
            style={styles.imgProfile}
            source={
              picture ? {uri: picture.uri} : require('../assets/no_avatar.jpg')
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

        <View alignSelf={'stretch'} style={{padding: 8}}>
          <TextInput
            label={'Полное имя'}
            value={fullName}
            style={{marginBottom: 8}}
            onChangeText={t => setFullName(t)}
          />
          <TextInput
            label="Веедите лимит за день"
            onChangeText={l => setLimit(l)}
            style={{marginBottom: 8}}
            value={limit}
            keyboardType={'numeric'}
          />
          <Button
            mode={'contained'}
            onPress={() => save()}
            disabled={fullName.length < 3 || limit.length < 1}>
            Сохранить
          </Button>
        </View>
      </ScrollView>
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

export default AddStudentScreen;
