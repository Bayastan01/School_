import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const AuthStudentComponent = () => {
  const [phone_number, setPhoneNumber] = useState('+996 ');
  const [verification_code, setVerificationCode] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        label="Номер мобильного телефона"
        value={phone_number}
        keyboardType={'phone-pad'}
        onChangeText={t => setPhoneNumber(t)}
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
          value={verification_code}
          onTextChange={a => setVerificationCode(a)}
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
