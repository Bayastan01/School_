import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ParentProfileScreen from '../screens/ParentProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grey, teal} from 'material-ui-colors';
import ParentFinanceScreen from '../screens/ParentFinanceScreen';
import ParentHomeStack from './ParentHomeStack';

const Tab = createMaterialBottomTabNavigator();

const ParentStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="ParentHomeStack"
      activeColor={grey[100]}
      barStyle={{backgroundColor: teal[900]}}>
      <Tab.Screen
        name="ParentHomeStack"
        component={ParentHomeStack}
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ParentFinanceScreen"
        component={ParentFinanceScreen}
        options={{
          tabBarLabel: 'Финансы',
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
        name="ParentProfileScreen"
        component={ParentProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default ParentStack;
