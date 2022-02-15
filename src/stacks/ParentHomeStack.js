import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ParentHomeScreen from '../screens/ParentHomeScreen';
import {APP_TITLE} from '../utils/settings';
import {grey, teal} from 'material-ui-colors';
import TopUpYourAccount from '../screens/TopUpYourAccount';
import AddStudentScreen from '../screens/AddStudentScreen';
import ParentStudent from '../screens/ParentStudent';

const Stack = createNativeStackNavigator();

const ParentHomeStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={'ParentHomeScreen'}
        screenOptions={{
          headerTintColor: grey[100],
          headerStyle: {backgroundColor: teal[900]},
        }}>
        <Stack.Screen
          options={{title: APP_TITLE}}
          name={'ParentHomeScreen'}
          component={ParentHomeScreen}
        />
        <Stack.Screen
          options={{title: 'Добавить ученика'}}
          name={'AddStudentScreen'}
          component={AddStudentScreen}
        />
        <Stack.Screen
          name={'ParentStudent'}
          component={ParentStudent}
          options={{title: 'Изменить данные'}}
        />
        <Stack.Screen
          options={{title: 'Пополнение счета'}}
          name={'TopUpYourAccount'}
          component={TopUpYourAccount}
        />
      </Stack.Navigator>
    </>
  );
};

export default ParentHomeStack;
