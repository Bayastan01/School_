import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {grey, teal} from 'material-ui-colors';
import {APP_TITLE} from '../utils/settings';

const TopUpYourAccount = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{APP_TITLE}</Text>
      <TextInput
        label="Введите сумму"
        style={styles.input}
        // value={addNumber}
        keyboardType={'phone-pad'}
        // onChangeText={text => setAddNumber(text)}
      />
      <Button
        // onPress={() => handleAddName()}
        style={styles.inputBtn}
        //  disabled={addInput}
        color={grey[100]}>
        Пополнить счет
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 300,
    height: 55,
    marginVertical: 8,
  },
  inputBtn: {
    backgroundColor: teal[800],
    paddingHorizontal: 60,
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
    color: teal[900],
    fontWeight: '500',
  },
});

export default TopUpYourAccount;
