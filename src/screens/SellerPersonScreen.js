import React from 'react';
import {Button, SafeAreaView} from 'react-native';
import {useAppDispatch} from '../utils';
import {clearSession} from '../stores/appStore';

const SellerPersonScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView>
      <Button title={'Выйти'} onPress={() => dispatch(clearSession())} />
    </SafeAreaView>
  );
};

export default SellerPersonScreen;
