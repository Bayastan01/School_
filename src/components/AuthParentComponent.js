import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const AuthParentComponent = () => {
  const [Parenttext, setParentText] = useState('');
  const [Parentnumber, setParentnumber] = useState('+996 ');
  const [Parentcode, setParentCode] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        label="Имя"
        value={Parenttext}
        onChangeText={Parenttext => setParentText(Parenttext)}
        style={styles.myInput}
      />

      <TextInput
        label="Номер мобильного телефона"
        value={Parentnumber}
        keyboardType={'phone-pad'}
        onChangeText={Parentnumber => setParentnumber(Parentnumber)}
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
          value={Parentcode}
          onTextChange={a => setParentCode(a)}
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

export default AuthParentComponent;
