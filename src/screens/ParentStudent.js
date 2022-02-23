import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {teal} from 'material-ui-colors';
import requester from '../utils/requester';
import ImagePicker from '../ui/ImagePicker';

const ParentStudent = ({navigation, route}) => {
  const [fullName, setFullName] = useState('');
  const [limit, setLimit] = useState('');
  const [busy, setBusy] = useState(false);
  const {item} = route.params;

  const [pictureCode, setPictureCode] = useState(null);
  const [pictureLoading, setPictureLoading] = useState(false);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    setFullName(item.full_name);
    setLimit(item.limit.toString());
    setPictureCode(item.picture.code.slice(8));
    setPicture(item.picture);
  }, []);

  const save = () => {
    if (busy) {
      return;
    }
    setBusy(true);
    requester
      .post('parent/student', {
        full_name: fullName,
        id: item.id,
        image_code: pictureCode,
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

  return (
    <>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <ImagePicker
          picture={picture}
          pictureCode={pictureCode}
          pictureLoading={pictureLoading}
          setPicture={setPicture}
          setPictureLoading={setPictureLoading}
        />

        <View alignSelf={'stretch'} style={{padding: 8}}>
          <TextInput
            label="Полное имя"
            value={fullName}
            onChangeText={text => setFullName(text)}
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
            disabled={
              fullName.length < 3 || busy || !picture || pictureLoading
            }>
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
