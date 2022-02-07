/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';
import {Provider} from 'react-redux';
import stores from './stores';

const Root = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={stores}>
      <NavigationContainer>
        <PaperProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <App />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default Root;
