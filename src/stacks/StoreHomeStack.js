import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {APP_TITLE} from '../utils/settings';
import {grey, teal} from 'material-ui-colors';
import SellerStudentScreen from '../screens/SellerStudentScreen';
import SellerMainScreen from '../screens/SellerMainScreen';

const Stack = createNativeStackNavigator();

const StoreHomeStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={'SellerMainScreen'}
        screenOptions={{
          headerTintColor: grey[100],
          headerStyle: {backgroundColor: teal[900]},
        }}>
        <Stack.Screen
          options={{title: APP_TITLE}}
          name={'SellerMainScreen'}
          component={SellerMainScreen}
        />
        <Stack.Screen
          options={{title: APP_TITLE}}
          name={'SellerStudentScreen'}
          component={SellerStudentScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default StoreHomeStack;
