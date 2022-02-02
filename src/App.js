import React from 'react';
import {StyleSheet} from 'react-native';
import WelcomeStack from './stacks/WelcomeStack';
import ParentStack from './stacks/ParentStack';
import StudentScreen from './screens/StudentScreen';
import SellerStack from './stacks/SellerStack';

const App = () => {
  const is_authorized = true;
  const user_type = 'parent';

  return (
    <>
      {!is_authorized ? (
        <WelcomeStack />
      ) : user_type === 'parent' ? (
        <ParentStack />
      ) : user_type === 'student' ? (
        <StudentScreen />
      ) : user_type === 'seller' ? (
        <SellerStack />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
