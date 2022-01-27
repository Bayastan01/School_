import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import SellerFinance from './SellerFinance';
import SellerFinanceOtchet from './SellerFinanceOtchet';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

const SellerIntroScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen
        name="Finas"
        component={SellerFinance}
        options={{ tabBarLabel: 'Home' }}
      />

      <Tab.Screen
        name="Otchet"
        component={SellerFinanceOtchet}
        options={{ tabBarLabel: 'Updates' }}
      />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default SellerIntroScreen;
