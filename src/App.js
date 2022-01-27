import React from 'react';
import {StyleSheet} from 'react-native';
import WelcomeStack from './stacks/WelcomeStack';
import ParentStack from './stacks/ParentStack';
import StudentStack from './stacks/StudentStack';

const App = () => {
  const is_authorized = true;
  const user_type = 'student';

  return (
    <>
      {!is_authorized ? (
        <WelcomeStack />
      ) : user_type === 'parent' ? (
        <ParentStack />
      ) : user_type === 'student' ? (
        <StudentStack />
      ) : user_type === 'seller' ? (
        <ParentStack />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
