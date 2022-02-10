import React, {useState} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {teal} from 'material-ui-colors';
import {useAppDispatch} from '../utils';
import {clearSession} from '../stores/appStore';

const screenSize = Dimensions.get('window');

const ParentProfileScreen = () => {
  const dispatch = useAppDispatch();

  const [name, onChangeName] = useState('');
  const [surname, onChangeSurname] = useState('');
  const [disabled, setDisabled] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <Avatar.Image
          size={(screenSize.height / 80) * 20}
          source={{
            uri: 'https://www.csudh.edu/Assets/csudh-sites/asianpacific/images/Faculty/No%20Avatar.jpg',
          }}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, marginTop: 50}}>
        <TextInput
          alignItems={'center'}
          label="Полное имя"
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          disabled={!disabled}
        />
        <TextInput
          label="Фамилия"
          style={styles.input}
          onChangeText={onChangeSurname}
          value={surname}
          disabled={!disabled}
        />
        <Button
          mode="contained"
          color={teal[900]}
          style={styles.EditBtn}
          onPress={() => setDisabled(true)}>
          Редактировать
        </Button>
        <Button
          color={teal[900]}
          style={styles.EditBtn}
          mode="contained"
          style={{marginTop: 10}}
          onPress={() => setDisabled(false)}>
          Сохранить
        </Button>
        <Button
          color={teal[900]}
          mode="contained"
          style={{marginTop: 10}}
          onPress={() => dispatch(clearSession())}>
          Выйти из аккунта
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 55,
    // marginTop: 5,
  },
  EditBtn: {
    backgroundColor: teal[800],
    // paddingHorizontal: 10,
    margin: 69,
    // marginTop: 5,
  },
  // SaveBtn: {
  //   backgroundColor: teal[800],
  //   // paddingHorizontal: 10,
  //   // marginTop: 5,
  // },
});

export default ParentProfileScreen;
