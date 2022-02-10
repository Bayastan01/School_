import React, {useState} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {teal} from 'material-ui-colors';

const screenSize = Dimensions.get('window');

const ParentProfileScreen = () => {
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
      <TextInput
        label="Полное имя"
        value={name}
        onChangeText={onChangeName}
        style={styles.input}
        disabled={!disabled}
      />

      <TextInput
        label="Фамилия"
        value={surname}
        onChangeText={onChangeSurname}
        style={styles.input}
        disabled={!disabled}
      />

      <Button
        style={styles.EditBtn}
        mode="contained"
        onPress={() => setDisabled(true)}>
        Редактировать
      </Button>
      <Button
        style={styles.EditBtn}
        mode="contained"
        onPress={() => setDisabled(false)}>
        Сохранить
      </Button>
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
