import React from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {grey, teal} from 'material-ui-colors';
import ParentPaymentScreen from './ParentPaymentScreen';
import ParentCostScreen from './ParentCostScreen';

const Tab = createMaterialTopTabNavigator();

const ParentFinanceScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="ParentPaymentScreen"
      screenOptions={{
        tabBarActiveTintColor: grey[100],
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {backgroundColor: teal[900]},
      }}>
      <Tab.Screen
        name="ParentPaymentScreen"
        component={ParentPaymentScreen}
        options={{tabBarLabel: 'Платежи'}}
      />
      <Tab.Screen
        name="ParentCostScreen"
        component={ParentCostScreen}
        options={{tabBarLabel: 'Расходы'}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default ParentFinanceScreen;
