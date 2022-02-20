import React, {createRef, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput, IconButton, Text} from 'react-native-paper';
import {grey, teal} from 'material-ui-colors';
import requester from '../utils/requester';
import ActionSheet from 'react-native-actions-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const IMAGE_PICKER_OPTIONS = {
  maxHeight: 500,
  maxWidth: 500,
  mediaType: 'photo',
};

const AddStudentScreen = ({navigation}) => {
  const [addName, setAddName] = useState('');
  const [limit, setLimit] = useState('');

  const actionSheetRef = createRef();

  const handleAddName = () => {
    requester
      .post('parent/student', {
        full_name: addName,
        limit: limit.length === 0 ? 0 : +limit,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const appendImage = img => {
    // const image = {
    //   name: img.fileName,
    //   type: img.type,
    //   uri: img.uri,
    // };
    //setDataValue('images', o => [...o, image]);
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
              launchImageLibrary(IMAGE_PICKER_OPTIONS, b => {
                if (b.didCancel === true) {
                  return;
                }
                appendImage(b.assets[0]);
              }).then(() => {
                actionSheetRef.current?.setModalVisible(false);
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
              launchCamera(IMAGE_PICKER_OPTIONS).then(b => {
                if (b.didCancel) {
                  return;
                }
                if (b.errorCode === 'camera_unavailable') {
                  Alert.alert('Ошибка!', 'Камера недоступна!');
                  return;
                }
                appendImage(b.assets[0]);
                actionSheetRef.current?.setModalVisible(false);
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
            source={require('../assets/no_avatar.jpg')}
          />
          <View style={styles.iconBtn}>
            <IconButton
              icon="camera"
              color={grey[100]}
              size={20}
              onPress={() => actionSheetRef.current.setModalVisible(true)}
            />
          </View>
        </View>

        <View alignSelf={'stretch'} style={{padding: 8}}>
          <TextInput
            label="Полное имя"
            value={addName}
            style={{marginBottom: 8}}
            onChangeText={text => setAddName(text)}
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
            onPress={() => handleAddName()}
            disabled={addName.length < 3 || limit.length < 1}>
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
