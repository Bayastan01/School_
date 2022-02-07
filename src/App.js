import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import WelcomeStack from './stacks/WelcomeStack';
import ParentStack from './stacks/ParentStack';
import StoreStack from './stacks/StoreStack';
import StudentScreen from './screens/StudentScreen';
import {checkUser} from './controllers/auth';
import {useAppSelector} from './utils';

const App = () => {
  const is_authorized = useAppSelector(state => state.app.is_authorized);
  const user_type = 'store';

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
      ) : user_type === 'store' ? (
        <StoreStack />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
