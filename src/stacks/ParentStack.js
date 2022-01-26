import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MainSreen from '../screens/MainSreen';
import Information from '../screens/Information';

const Tab = createMaterialBottomTabNavigator();

const ParentStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainSreen} />
      <Tab.Screen name="Information" component={Information} />
    </Tab.Navigator>
  );
};

export default ParentStack;
