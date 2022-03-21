import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../utils';
import {clearSession} from '../stores/appStore';
import {Avatar, Button, TextInput} from 'react-native-paper';

const screenSize = Dimensions.get('window');

const SellerPersonScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.app.user);
  const store = useAppSelector(state => state.app.store);

  const [fullName, setFullName] = useState('');
  const [busy, setBusy] = useState(false);

  const signOut = () => {
    // TODO: confirm
    dispatch(clearSession());
  };

  useEffect(() => {
    setFullName(user.full_name);
  }, []);

  return (
    <SafeAreaView>
      <View style={{padding: 8}}>
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Avatar.Image
            size={screenSize.width * 0.4}
            source={require('../assets/no_avatar.jpg')}
          />
        </View>
        <TextInput
          alignItems={'center'}
          label="Полное имя"
          style={{marginTop: 8}}
          onChangeText={setFullName}
          value={fullName}
          disabled={busy}
        />
        <TextInput
          label="Телефон номер"
          style={{marginTop: 8}}
          value={`+${user.phone_number}`}
          disabled
        />
        <TextInput
          label="Название магазина"
          style={{marginTop: 8}}
          value={store.title}
          disabled
        />
        <Button
          mode="contained"
          style={{marginTop: 8}}
          disabled
          onPress={() => setBusy(true)}>
          Сохранить
        </Button>
        <Button
          mode="outlined"
          style={{marginTop: 8}}
          onPress={() => signOut()}>
          Выйти из аккунта
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SellerPersonScreen;
