import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import SellerPersonScreen from '../screens/SellerPersonScreen';
import StoreFinanceStack from '../screens/StoreFinanceStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grey, teal} from 'material-ui-colors';
import StoreHomeStack from './StoreHomeStack';

const Tab = createMaterialBottomTabNavigator();

const StoreStack = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeStack"
        activeColor={grey[100]}
        barStyle={{backgroundColor: teal[900]}}>
        <Tab.Screen
          name="HomeStack"
          component={StoreHomeStack}
          options={{
            tabBarLabel: 'Главная',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="FinanceStack"
          component={StoreFinanceStack}
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
          component={SellerPersonScreen}
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

export default StoreStack;
