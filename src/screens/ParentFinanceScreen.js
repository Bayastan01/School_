import React from 'react';
import {SafeAreaView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {teal} from 'material-ui-colors';
import ParentPaymentScreen from './ParentPaymentScreen';
import ParentCostScreen from './ParentCostScreen';

const Tab = createMaterialTopTabNavigator();

const ParentFinanceScreen = () => {
  return (
    <SafeAreaView
      forceInset={{top: 'always'}}
      style={{backgroundColor: teal[900], flex: 1}}>
      <Tab.Navigator
        initialRouteName="ParentPaymentScreen"
        screenOptions={{
          tabBarActiveTintColor: 'white',
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
    </SafeAreaView>
  );
};

export default ParentFinanceScreen;
