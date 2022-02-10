import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {teal} from 'material-ui-colors';
import {phoneNumberValidator, useAppDispatch} from '../utils';
import {VERIFICATION_CODE_LENGTH} from '../utils/settings';
import requester from '../utils/requester';
import {makeAuth} from '../stores/appStore';

const AuthParentComponent = ({onBack}) => {
  const dispatch = useAppDispatch();

  const [full_name, setFullName] = useState('');
  const [phone_number, setPhoneNumber] = useState('+996');
  const [verification_code, setVerificationCode] = useState('');
  const [user_exists, setUser_exists] = useState(false);
  const [step, setStep] = useState(0);

  const canNext = () => {
    if (step === 0) {
      return phoneNumberValidator(phone_number);
    }
    if (step === 2) {
      return (
        verification_code.length === VERIFICATION_CODE_LENGTH &&
        (user_exists || full_name.length >= 3)
      );
    }
    return false;
  };

  const confirmCode = () => {
    if (step === 3) {
      return;
    }
    setStep(3);
    requester
      .post('auth/parent/' + (user_exists ? 'login' : 'register'), {
        phone_number: phone_number.slice(1),
        verification_code,
        full_name,
      })
      .then(res => {
        dispatch(
          makeAuth({
            data: res.payload,
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
      .post('auth/parent/check', {
        phone_number: phone_number.slice(1),
      })
      .then(res => {
        console.log(res);
        setStep(2);
        setUser_exists(res.payload.user_exists);
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
        keyboardType={'phone-pad'}
        disabled={step > 0}
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
      {step === 2 && !user_exists ? (
        <TextInput
          label="Полное имя"
          value={full_name}
          onChangeText={t => setFullName(t)}
          style={styles.myInput}
        />
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
    marginVertical: 8,
  },
  codeStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
});

export default AuthParentComponent;
