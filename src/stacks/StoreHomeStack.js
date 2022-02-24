import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_TITLE} from '../utils/settings';
import {grey, teal} from 'material-ui-colors';
import SellerStudentScreen from '../screens/SellerStudentScreen';
import StoreHomeScreen from '../screens/StoreHomeScreen';

const Stack = createNativeStackNavigator();

const StoreHomeStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={'StoreHomeScreen'}
        screenOptions={{
          headerTintColor: grey[100],
          headerStyle: {backgroundColor: teal[900]},
        }}>
        <Stack.Screen
          options={{title: APP_TITLE}}
          name={'StoreHomeScreen'}
          component={StoreHomeScreen}
        />
        <Stack.Screen
          options={{title: 'Счет школьника'}}
          name={'SellerStudentScreen'}
          component={SellerStudentScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default StoreHomeStack;
