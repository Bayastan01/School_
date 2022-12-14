import React from 'react';
import SellerFinance from './SellerFinance';
import StoreFinancePaymentsScreen from './StoreFinancePaymentsScreen';
import {teal} from 'material-ui-colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const StoreFinanceStack = () => {
  return (
    <SafeAreaView
      forceInset={{top: 'always'}}
      style={{backgroundColor: teal[900], flex: 1}}>
      <Tab.Navigator
        initialRouteName="StorePaymentsScreen"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarStyle: {backgroundColor: teal[900]},
        }}>
        <Tab.Screen
          name="StorePaymentsScreen"
          component={StoreFinancePaymentsScreen}
          options={{tabBarLabel: 'Оплаты'}}
        />
        <Tab.Screen
          name="FinanceScreen"
          component={SellerFinance}
          options={{tabBarLabel: 'Обналичивания'}}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default StoreFinanceStack;
