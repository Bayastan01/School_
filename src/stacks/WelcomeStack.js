import React from 'react';
import {StyleSheet} from 'react-native';
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

const styles = StyleSheet.create({});

export default WelcomeStack;
