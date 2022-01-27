import React from 'react';
import {StyleSheet} from 'react-native';
import WelcomeStack from './stacks/WelcomeStack';
import ParentStack from './stacks/ParentStack';

const App = () => {
  const is_authorized = false;

  return (
    <>
      {!is_authorized ? (
        <WelcomeStack />
      ) : (
        <>
          <ParentStack />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
