import React, {createRef, useState} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Button, TextInput, IconButton} from 'react-native-paper';
import {grey, teal} from 'material-ui-colors';
import ActionSheet from 'react-native-actions-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IMAGE_PICKER_OPTIONS = {
  maxHeight: 500,
  maxWidth: 500,
  mediaType: 'photo',
};
const AddStudentScreen = ({setDataValue}) => {
  const [addName, setAddName] = useState();
  const [nameItem, setNameItem] = useState([]);
  const [visible, setVisible] = useState(false);
  const actionSheetRef = createRef();

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  const handleAddName = () => {
    setNameItem([...nameItem, addName]);
    setAddName(null);
    setVisible(false);
  };

  const appendImage = img => {
    const image = {
      name: img.fileName,
      type: img.type,
      uri: img.uri,
    };
    setDataValue('images', o => [...o, image]);
  };

  const onDeleteImage = o => {
    setDataValue('images', k => {
      const l = k.slice();
      l.splice(o, 1);
      return l;
    });

    return (
      <View style={styles.container}>
        <Image
          style={styles.imgProfile}
          source={{
            uri: 'https://www.csudh.edu/Assets/csudh-sites/asianpacific/images/Faculty/No%20Avatar.jpg',
          }}
        />
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
                <View style={styles.iconBtn}>
                  <IconButton
                    icon="camera"
                    color={grey[100]}
                    size={20}
                    onPress={() => console.log('Pressed')}
                  />
                  <MaterialCommunityIcons
                    name={'image'}
                    color={'#0079C2FF'}
                    size={30}
                  />
                  <View>
                    <Text style={{ fontSize: 15 }}>Галерея</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                launchCamera(IMAGE_PICKER_OPTIONS, b => {
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
                  name={'camera'}
                  color={'#0079C2FF'}
                  size={30}
                />
                <View>
                  <Text style={{ fontSize: 15 }}>Камера</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ActionSheet>


        <TextInput
          label="Полное имя"
          // value={addName}
          onChangeText={text => setAddName(text)}
          style={styles.input}
        />

        <Button
          onPress={() => handleAddName()}
          style={styles.inputBtn}
          //  disabled={addInput}
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
      right: 120,
      top: 100,
      width: 40,
      height: 40,
      borderRadius: 100,
      backgroundColor: teal[900],
      zIndex: 1,
    },
  });
}

export default AddStudentScreen;
