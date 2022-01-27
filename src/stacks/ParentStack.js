import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MainSreen from '../screens/SelllerMainSreen';
import Information from '../screens/SellerPersonScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { grey, teal } from "material-ui-colors";

const Tab = createMaterialBottomTabNavigator();

const ParentStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor={grey[100]}
      barStyle={{backgroundColor: teal[900]}}>
      <Tab.Screen
        name="Home"
        component={MainSreen}
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Information"
        component={Information}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ParentStack;
