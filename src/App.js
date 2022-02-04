import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import WelcomeStack from './stacks/WelcomeStack';
import ParentStack from './stacks/ParentStack';
import StoreStack from './stacks/StoreStack';
import StudentScreen from './screens/StudentScreen';
import {checkUser} from './controllers/auth';

const App = () => {
  const is_authorized = false;
  const user_type = 'parent';

  useEffect(() => {
    try {
      checkUser().then();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      {!is_authorized ? (
        <WelcomeStack />
      ) : user_type === 'parent' ? (
        <ParentStack />
      ) : user_type === 'student' ? (
        <StudentScreen />
      ) : user_type === 'seller' ? (
        <StoreStack />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
