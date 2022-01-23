import React from 'react';
import {StyleSheet} from 'react-native';
import WelcomeStack from './stacks/WelcomeStack';
import {Text} from 'react-native-paper';

const App = () => {
  const is_authorized = false;

  return (
    <>
      {!is_authorized ? (
        <WelcomeStack />
      ) : (
        <>
          <Text>User</Text>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
