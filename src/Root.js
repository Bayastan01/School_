/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';
import {Provider} from 'react-redux';
import stores from './stores';
import {teal} from 'material-ui-colors';
import Toast from 'react-native-toast-message';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: teal[900],
    accent: '#f1c40f',
  },
};

const Root = () => {
  return (
    <>
      <Provider store={stores}>
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <App />
          </PaperProvider>
        </NavigationContainer>
      </Provider>
      <Toast />
    </>
  );
};

export default Root;
