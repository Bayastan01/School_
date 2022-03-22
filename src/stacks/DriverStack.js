import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grey, teal} from 'material-ui-colors';
import DriverHomeStack from './DriverHomeStack';
import DriverProfileScreen from '../screens/DriverProfileScreen';
import DriverFinanceStack from './DriverFinanceStack';

const Tab = createMaterialBottomTabNavigator();

const DriverStack = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeStack"
        activeColor={grey[100]}
        barStyle={{backgroundColor: teal[900]}}>
        <Tab.Screen
          name="HomeStack"
          component={DriverHomeStack}
          options={{
            tabBarLabel: 'Главная',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="FinanceStack"
          component={DriverFinanceStack}
          options={{
            tabBarLabel: 'Финанс',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="currency-usd"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={DriverProfileScreen}
          options={{
            tabBarLabel: 'Профиль',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="account-multiple"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default DriverStack;
