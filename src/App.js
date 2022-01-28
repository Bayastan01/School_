import React from 'react';
import {StyleSheet} from 'react-native';
import WelcomeStack from './stacks/WelcomeStack';
import ParentStack from './stacks/ParentStack';
import SellerStack from './stacks/SellerStack';

const App = () => {
  const is_authorized = true;

  return (
    <>
      {!is_authorized ? (
        <WelcomeStack />
      ) : (
        <>
          <SellerStack />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
