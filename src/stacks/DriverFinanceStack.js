import React from 'react';
import {teal} from 'material-ui-colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView} from 'react-native';
import DriverCashingScreen from '../screens/DriverCashingScreen';
import DriverPaymentsScreen from '../screens/DriverPaymentsScreen';

const Tab = createMaterialTopTabNavigator();

const DriverFinanceStack = () => {
  return (
    <SafeAreaView
      forceInset={{top: 'always'}}
      style={{backgroundColor: teal[900], flex: 1}}>
      <Tab.Navigator
        initialRouteName="PaymentsScreen"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarStyle: {backgroundColor: teal[900]},
        }}>
        <Tab.Screen
          name="PaymentsScreen"
          component={DriverPaymentsScreen}
          options={{tabBarLabel: 'Оплаты'}}
        />
        <Tab.Screen
          name="CashingScreen"
          component={DriverCashingScreen}
          options={{tabBarLabel: 'Обналичивания'}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default DriverFinanceStack;
