import React, {createRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, TextInput, IconButton} from 'react-native-paper';
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
      .then(res => {
        navigation.goBack();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const appendImage = img => {
    const image = {
      name: img.fileName,
      type: img.type,
      uri: img.uri,
    };
    //setDataValue('images', o => [...o, image]);
  };

  return (
    <View style={styles.container}>

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
                color={'#0079C2FF'}
                size={30}
              />
              <View>
                <Text style={{fontSize: 15}}>Галерея</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              launchCamera(IMAGE_PICKER_OPTIONS).then(b => {
                if (b.didCancel) {
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
                color={'#0079C2FF'}
                size={30}
              />
              <View>
                <Text style={{fontSize: 15}}>Камера</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ActionSheet>

      <View>
        <Image
          style={styles.imgProfile}
          source={{
            uri: 'https://www.csudh.edu/Assets/csudh-sites/asianpacific/images/Faculty/No%20Avatar.jpg',
          }}
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

      <TextInput
        label="Полное имя"
        value={addName}
        onChangeText={text => setAddName(text)}
        style={styles.input}
      />
      <TextInput
        label="Веедите лимит за день"
        onChangeText={l => setLimit(l)}
        style={styles.input}
        value={limit}
        keyboardType={'numeric'}
      />
      <Button
        onPress={() => handleAddName()}
        style={styles.inputBtn}
        disabled={addName.length < 3 || limit.length < 1}
        color={grey[100]}>
        Сохранить
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 55,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBtn: {
    backgroundColor: teal[800],
    paddingHorizontal: 90,
    marginTop: 20,
  },
  imgProfile: {
    position: 'relative',
    marginVertical: 20,
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  iconBtn: {
    position: 'absolute',
    right: -5,
    bottom: 15,
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: teal[900],
    zIndex: 1,
  },
});

export default AddStudentScreen;
