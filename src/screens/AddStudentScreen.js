import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import requester from '../utils/requester';
import ImagePicker from '../ui/ImagePicker';

const AddStudentScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [limit, setLimit] = useState('');

  const [pictureCode] = useState(Math.floor(Date.now() / 1000).toString());
  const [pictureLoading, setPictureLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [busy, setBusy] = useState(false);

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
      .catch(() => {
        setBusy(false);
      });
  };

  return (
    <>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <ImagePicker
          picture={picture}
          pictureCode={pictureCode}
          pictureLoading={pictureLoading || busy}
          setPicture={setPicture}
          setPictureLoading={setPictureLoading || busy}
        />
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
            disabled={fullName.length < 3 || !picture || pictureLoading}>
            Сохранить
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default AddStudentScreen;
