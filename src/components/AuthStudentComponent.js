import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const AuthStudentComponent = () => {
  // const [text, setText] = useState('');
  const [studentNumber, setStudentNumber] = useState('+996 ');
  const [studentCode, setStudentCode] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        label="Номер мобильного телефона"
        value={studentNumber}
        keyboardType={'phone-pad'}
        onChangeText={studentNumber => setStudentNumber(studentNumber)}
        style={styles.myInput}
      />

      <View style={styles.codeStyle}>
        <SmoothPinCodeInput
          cellStyle={{
            borderBottomWidth: 2,
            borderColor: 'gray',
            backgroundColor: 'white',
          }}
          cellStyleFocused={{
            borderColor: 'black',
          }}
          value={studentCode}
          onTextChange={a => setStudentCode(a)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myInput: {
    height: 60,
    marginVertical: 8,
  },
  codeStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
});

export default AuthStudentComponent;
