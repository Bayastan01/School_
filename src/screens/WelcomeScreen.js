import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {APP_TITLE} from '../utils/settings';
import {
  Title,
  Headline,
  Subheading,
  RadioButton,
  Text,
  Button,
} from 'react-native-paper';
import {grey, teal, common} from 'material-ui-colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthParentComponent from '../components/AuthParentComponent';
import AuthStudentComponent from '../components/AuthStudentComponent';
import AuthSellerComponent from '../components/AuthSellerComponent';
const USER_TYPES = [
  {name: 'parent', label: 'Родитель'},
  // {name: 'head_teacher', label: 'Директор школы'},
  {name: 'student', label: 'Школьник'},
  {name: 'seller', label: 'Продавец или кафе'},
  // {name: 'сlassroom_teacher', label: 'Классный руководитель'},
];

const WelcomeScreen = () => {
  const [step, setStep] = useState(0);
  const [who_are_you, setWhoAreYou] = useState(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: grey[100],
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginHorizontal: 18,
        }}>
        <View />
        {step === 0 ? (
          <View>
            <Icon name="school-outline" size={80} color={teal[900]} />
          </View>
        ) : null}
        <View>
          <Headline style={{color: grey[600], textAlign: 'center'}}>
            {APP_TITLE}
          </Headline>
          <Subheading style={{color: grey[800], textAlign: 'center'}}>
            Добро пожаловать в {APP_TITLE}!
          </Subheading>
        </View>
      </View>
      <View
        style={{
          shadowColor: '#000000',
          shadowOffset: 1,
          shadowRadius: 10,
          elevation: 1,
          padding: 18,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          backgroundColor: teal[900],
        }}>
        <Icon
          style={{alignSelf: 'center'}}
          name="account-question-outline"
          size={50}
          color={grey[100]}
        />
        <Title style={{color: common.white, textAlign: 'center'}}>
          {step === 0 ? (
            <Text
              style={{
                color: ' white',
              }}>
              {' '}
              Кем вы являетесь?{' '}
            </Text>
          ) : null}
          {step === 1 && who_are_you === 'parent' ? (
            <Text
              style={{
                color: ' white',
              }}>
              Заполните !{' '}
            </Text>
          ) : null}
          {step === 1 && who_are_you === 'seller' ? (
            <Text
              style={{
                color: ' white',
              }}>
              Заполните !{' '}
            </Text>
          ) : null}
          {step === 1 && who_are_you === 'student' ? (
            <Text
              style={{
                color: ' white',
              }}>
              Заполните !{' '}
            </Text>
          ) : null}
        </Title>
        <View style={{marginVertical: 12}}>
          {step === 0 ? (
            <RadioButton.Group
              onValueChange={v => setWhoAreYou(v)}
              value={who_are_you}>
              {USER_TYPES.map(g => (
                <TouchableOpacity
                  onPress={() => setWhoAreYou(g.name)}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                    color={grey[100]}
                    uncheckedColor={grey[100]}
                    value={g.name}
                  />
                  <Text style={{color: grey[100]}}>{g.label}</Text>
                </TouchableOpacity>
              ))}
            </RadioButton.Group>
          ) : null}
          {step === 1 ? (
            
            <>{who_are_you === 'parent' ? <AuthParentComponent /> : null}</>
          ) : null}
          {step === 1 ? (
            <>{who_are_you === 'student' ? <AuthStudentComponent /> : null}</>
          ) : null}
          {step === 1 ? (
            <>{who_are_you === 'seller' ? <AuthSellerComponent /> : null}</>
          ) : null}
        </View>
        {step === 0 ? (
          <Button
            onPress={() => setStep(s => s + 1)}
            mode={'contained'}
            // disabled={who_are_you === null}
            contentStyle={{backgroundColor: 'white'}}
            labelStyle={{color: teal[900]}}>
            Далее
          </Button>
        ) : null}
        {step === 1 && who_are_you === 'seller' ? (
          <Button
            onPress={() => setStep(s => s + 1)}
            mode={'contained'}
            // disabled={sellertNumber === 13}
            contentStyle={{backgroundColor: 'white'}}
            labelStyle={{color: teal[900]}}>
            Отправить код
          </Button>
        ) : null}
        {step === 1 && who_are_you === 'parent' ? (
          <Button
            onPress={() => setStep(s => s + 1)}
            mode={'contained'}
            // disabled={sellertNumber.length === 9}
            contentStyle={{backgroundColor: 'white'}}
            labelStyle={{color: teal[900]}}>
            Отправить код
          </Button>
        ) : null}
        {step === 1 && who_are_you === 'student' ? (
          <Button
            onPress={() => setStep(s => s + 1)}
            mode={'contained'}
            // disabled={who_are_you === null}
            contentStyle={{backgroundColor: 'white'}}
            labelStyle={{color: teal[900]}}>
            Отправить код
          </Button>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});

export default WelcomeScreen;
