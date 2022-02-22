import React, {createRef, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, TextInput, IconButton} from 'react-native-paper';
import {grey, teal} from 'material-ui-colors';
import requester from '../utils/requester';
import ActionSheet from 'react-native-actions-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getImageUrl} from '../utils';

const IMAGE_PICKER_OPTIONS = {
  maxHeight: 500,
  maxWidth: 500,
  mediaType: 'photo',
};

const ParentStudent = ({navigation, route}) => {
  const [addName, setAddName] = useState('');
  const [limit, setLimit] = useState('');
  const actionSheetRef = createRef();
  const [busy, setBusy] = useState(false);
  const {item} = route.params;

  useEffect(() => {
    setAddName(item.full_name);
    setLimit(item.limit.toString());
  }, []);

  const save = () => {
    if (busy) {
      return;
    }
    setBusy(true);
    requester
      .post('parent/student', {
        full_name: addName,
        id: item.id,
        limit: limit.length === 0 ? 0 : +limit,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch(() => {});
  };

  const _delete = () => {
    Alert.alert('Подтвердите', 'Вы уверены?', [
      {
        text: 'Нет',
        style: 'cancel',
      },
      {
        text: 'Да',
        onPress: () => {
          if (busy) {
            return;
          }
          setBusy(true);
          requester
            .delete('parent/student', {
              id: item.id,
            })
            .then(() => {
              navigation.goBack();
            })
            .finally(() => {
              setBusy(false);
            });
        },
      },
    ]);
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

      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View>
          <Image
            style={styles.imgProfile}
            source={{uri: getImageUrl(item.picture.path)}}
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
            onChangeText={text => setAddName(text)}
            style={styles.input}
          />
          <TextInput
            label="Лимит за день"
            onChangeText={l => setLimit(l)}
            style={styles.input}
            value={limit}
            keyboardType={'numeric'}
          />
          <Button
            onPress={() => save()}
            style={styles.inputBtn}
            mode={'contained'}
            loading={busy}
            disabled={addName.length < 3 || limit.length < 1 || busy}>
            Изменить
          </Button>
          <Button
            mode={'outlined'}
            disabled={busy}
            loading={busy}
            onPress={() => _delete()}
            style={styles.inputBtn}>
            Удалить
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  inputBtn: {
    marginTop: 8,
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

export default ParentStudent;
