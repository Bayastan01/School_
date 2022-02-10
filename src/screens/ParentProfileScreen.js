import React, {useState} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Avatar, Button, TextInput, Title} from 'react-native-paper';
import {teal} from 'material-ui-colors';
import {useAppDispatch} from "../utils";
import {clearSession} from "../stores/appStore";

const screenSize = Dimensions.get('window');

const ParentProfileScreen = () => {
  const dispatch = useAppDispatch();

  const [name, onChangeName] = useState('Асан');
  const [surname, onChangeSurname] = useState('Асанов');
  const [disabled, setDisabled] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 18,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <Avatar.Image
          size={(screenSize.height / 100) * 30}
          source={{
            uri: 'https://www.gannett-cdn.com/presto/2018/08/14/PTAL/6e4fff76-595d-4069-9112-cfe15dbfaa43-IMG_Stadium.jpeg?width=660&height=319&fit=crop&format=pjpg&auto=webp',
          }}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, marginTop: 50}}>
        <Title style={{textAlign: 'center'}}>Имя</Title>
        <TextInput
          alignItems={'center'}
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          disabled={!disabled}
        />
        <Title style={{textAlign: 'center'}}>Фамилия</Title>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSurname}
          value={surname}
          disabled={!disabled}
        />
        <Button
          mode="contained"
          color={teal[900]}
          onPress={() => setDisabled(true)}>
          Редактировать
        </Button>
        <Button
          color={teal[900]}
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
    height: 40,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 5,
  },
});

export default ParentProfileScreen;
