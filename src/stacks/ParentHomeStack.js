import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ParentHomeScreen from '../screens/ParentHomeScreen';
import {APP_TITLE} from '../utils/settings';
import {grey, teal} from 'material-ui-colors';
import AddStudentScreen from '../screens/AddStudentScreen';
import TopUpYourAccount from '../screens/TopUpYourAccount';

const Stack = createNativeStackNavigator();

const ParentHomeStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={'ParentHomeScreen'}
        screenOptions={{
          headerTintColor: grey[100],
          headerStyle: {backgroundColor: teal[900]},
        }}>
        <Stack.Screen
          options={{title: APP_TITLE}}
          name={'ParentHomeScreen'}
          component={ParentHomeScreen}
        />
        <Stack.Screen
          options={{title: 'Главная'}}
          name={'AddStudentScreen'}
          component={AddStudentScreen}
          style={styles.tabStyles}
        />
        <Stack.Screen
          options={{title: 'Главная'}}
          name={'TopUpYourAccount'}
          component={TopUpYourAccount}
          style={styles.tabStyles}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabStyles: {
    backgroundColor: teal[900],
  },
});

export default ParentHomeStack;
