import React from 'react';
import {StyleSheet} from 'react-native';
import SellerFinance from './SellerFinance';
import SellerFinanceOtchet from './SellerFinanceOtchet';
import {teal} from 'material-ui-colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

const SellerIntroScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {backgroundColor: teal[900]},
      }}>
      <Tab.Screen
        name="Finas"
        component={SellerFinance}
        options={{tabBarLabel: 'Обналичи'}}
      />

      <Tab.Screen
        name="Otchet"
        component={SellerFinanceOtchet}
        options={{tabBarLabel: 'Оплаты'}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default SellerIntroScreen;
