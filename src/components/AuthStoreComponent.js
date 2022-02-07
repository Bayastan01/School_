import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {teal} from 'material-ui-colors';
import {phoneNumberValidator, useAppDispatch} from '../utils';
import requester from '../utils/requester';
import {VERIFICATION_CODE_LENGTH} from '../utils/settings';
import {makeAuth} from '../stores/appStore';

const AuthStoreComponent = ({onBack}) => {
  const dispatch = useAppDispatch();

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
    if (step === 2) {
      return verification_code.length === VERIFICATION_CODE_LENGTH;
    }
    return false;
  };

  const confirmCode = () => {
    if (step === 3) {
      return;
    }
    setStep(3);
    requester
      .post('auth/store/login', {
        phone_number: phone_number.slice(1),
        verification_code,
      })
      .then(res => {
        dispatch(
          makeAuth({
            user: res.payload.user,
            token: res.payload.token,
            from_storage: false,
          }),
        );
        console.log(res);
      })
      .catch(e => {
        setStep(2);
      });
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
        setStep(2);
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
      {[0, 1].includes(step) ? (
        <Button
          onPress={() => sendCode()}
          mode={'contained'}
          disabled={!canNext()}
          style={{marginTop: 8}}
          contentStyle={{backgroundColor: 'white'}}
          labelStyle={{color: teal[900]}}>
          Отправить код
        </Button>
      ) : null}
      {[2, 3].includes(step) ? (
        <Button
          onPress={() => confirmCode()}
          mode={'contained'}
          disabled={!canNext()}
          style={{marginTop: 8}}
          contentStyle={{backgroundColor: 'white'}}
          labelStyle={{color: teal[900]}}>
          Подтвердить код
        </Button>
      ) : null}
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
