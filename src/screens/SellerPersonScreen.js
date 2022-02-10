import React from 'react';
import {View, Button} from 'react-native';
import {useAppDispatch} from '../utils';
import {clearSession} from '../stores/appStore';

const SellerPersonScreen = () => {
  const dispath = useAppDispatch();
  return (
    <View>
      <Button title={'Выйти'} onPress={() => dispath(clearSession())} />
    </View>
  );
};

export default SellerPersonScreen;
