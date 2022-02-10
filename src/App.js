import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import WelcomeStack from './stacks/WelcomeStack';
import ParentStack from './stacks/ParentStack';
import StoreStack from './stacks/StoreStack';
import StudentScreen from './screens/StudentScreen';
import {useAppDispatch, useAppSelector} from './utils';
import storage from './utils/storage';
import requester from './utils/requester';
import {clearSession, makeAuth} from './stores/appStore';
import {Text} from 'react-native-paper';

const App = () => {
  const dispatch = useAppDispatch();

  const is_authorized = useAppSelector(state => state.app.is_authorized);
  const user_type = useAppSelector(state => state.app.user_type);
  const [checking, setChecking] = useState(false);

  const checkUser = async () => {
    if (checking) {
      return;
    }

    setChecking(true);

    storage
      .load({key: 'user'})
      .then(ret => {
        dispatch(makeAuth({data: ret, from_storage: true}));
        requester
          .get('auth/me')
          .then(res => {
            dispatch(
              makeAuth({
                data: res.payload,
                from_storage: true,
              }),
            );
          })
          .catch(e => {
            if (e.status !== 'network_error') {
              dispatch(clearSession());
            }
            // TODO: handle invalid or expired token exception
          });
      })
      .catch(err => {
        console.warn(err.message);
        switch (err.name) {
          case 'ExpiredError':
            // TODO: handle expired token exception
            break;
        }
      })
      .finally(() => {
        setChecking(false);
      });
  };

  useEffect(() => {
    checkUser().then();
  }, []);

  if (checking) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

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

export default App;
