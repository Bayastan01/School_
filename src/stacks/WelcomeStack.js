import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'WelcomeScreen'}>
        <Stack.Screen name={'WelcomeScreen'} component={WelcomeScreen} />
      </Stack.Navigator>
    </>
  );
};

export default WelcomeStack;
