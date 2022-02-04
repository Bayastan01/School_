import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {teal} from 'material-ui-colors';
import {phoneNumberValidator} from '../utils';
import requester from '../utils/requester';

const AuthStoreComponent = ({onBack}) => {
  const [phone_number, setPhoneNumber] = useState('+996');
  const [verification_code, setVerificationCode] = useState('');
  const [step, setStep] = useState(0);
  // 0 init
  // 1 code is sending
  // 2 code is sent
  // 3 code is checking

  const canNext = () => {
    if (step === 0) {
      return phoneNumberValidator(phone_number);
    }
    return false;
  };

  const sendCode = () => {
    if (step === 1) {
      return;
    }
    setStep(1);
    requester
      .post('auth/store/check', {
        phone_number: phone_number.slice(1),
      })
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        setStep(0);
      });
  };

  return (
    <View>
      <TextInput
        label="Номер мобильного телефона"
        value={phone_number}
        disabled={step > 0}
        keyboardType={'phone-pad'}
        onChangeText={t => setPhoneNumber(t)}
        style={styles.myInput}
      />
      {step > 1 ? (
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
      ) : null}
      <Button
        onPress={() => sendCode()}
        mode={'contained'}
        disabled={!canNext()}
        style={{marginTop: 8}}
        contentStyle={{backgroundColor: 'white'}}
        labelStyle={{color: teal[900]}}>
        Отправить код
      </Button>
      <Button
        style={{marginTop: 8}}
        onPress={() => onBack()}
        mode={'contained'}
        disabled={step % 2 === 1}
        contentStyle={{backgroundColor: 'white'}}
        labelStyle={{color: teal[900]}}>
        Назад
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  myInput: {
    height: 60,
  },
  codeStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 22,
  },
});

export default AuthStoreComponent;
