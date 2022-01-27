import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const AuthSellerComponent = ({}) => {
  // const [text, setText] = useState('');
  const [sellertNumber, setSellerNumber] = useState('+996 ');
  const [sellerCode, setSellerCode] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        label="Номер мобильного телефона"
        value={sellertNumber}
        keyboardType={'phone-pad'}
        onChangeText={sellertNumber => setSellerNumber(sellertNumber)}
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
          value={sellerCode}
          onTextChange={a => setSellerCode(a)}
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

export default AuthSellerComponent;
