import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import SelllerMainSreen from '../screens/SelllerMainSreen';
import SellerPersonScreen from '../screens/SellerPersonScreen';
import SellerIntroScreen from '../screens/SelllerIntroScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grey, teal} from 'material-ui-colors';

const Tab = createMaterialBottomTabNavigator();

const SellerStack = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor={grey[100]}
        barStyle={{backgroundColor: teal[900]}}>
        <Tab.Screen
          name="Home"
          component={SelllerMainSreen}
          options={{
            tabBarLabel: 'Главная',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Finas"
          component={SellerIntroScreen}
          options={{
            tabBarLabel: 'Финас',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="currency-usd" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="Dom"
          component={SellerPersonScreen}
          options={{
            tabBarLabel: 'Дом',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default SellerStack;
