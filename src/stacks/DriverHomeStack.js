import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_TITLE} from '../utils/settings';
import {grey, teal} from 'material-ui-colors';
import DriverHomeScreen from '../screens/DriverHomeScreen';

const Stack = createNativeStackNavigator();

const DriverHomeStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={'DriverHomeScreen'}
        screenOptions={{
          headerTintColor: grey[100],
          headerStyle: {backgroundColor: teal[900]},
        }}>
        <Stack.Screen
          options={{title: APP_TITLE}}
          name={'DriverHomeScreen'}
          component={DriverHomeScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default DriverHomeStack;
