import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {grey, teal} from 'material-ui-colors';
import requester from '../utils/requester';

const AddStudentScreen = ({navigation}) => {
  const [addName, setAddName] = useState('');
  const [limit, setLimit] = useState('');

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

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgProfile}
        source={{
          uri: 'https://icons-for-free.com/iconfiles/png/512/profile+profile+page+user+icon-1320186864367220794.png',
        }}
      />
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
    marginVertical: 8,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBtn: {
    backgroundColor: teal[800],
    paddingHorizontal: 80,
    marginTop: 20,
  },
  imgProfile: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
});

export default AddStudentScreen;
