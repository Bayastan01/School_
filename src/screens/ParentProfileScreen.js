import React, {useEffect, useState} from 'react';
import {Dimensions, View, SafeAreaView} from 'react-native';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../utils';
import {clearSession} from '../stores/appStore';

const screenSize = Dimensions.get('window');

const ParentProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.app.user);
  const [busy, setBusy] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone_number, setPhone_number] = useState('');

  const signOut = () => {
    // TODO: confirm
    dispatch(clearSession());
  };

  useEffect(() => {
    setFullName(user.full_name);
    setPhone_number(user.phone_number);
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
          onChangeText={setPhone_number}
          value={phone_number}
          disabled={busy}
        />
        <Button
          mode="contained"
          style={{marginTop: 8}}
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

export default ParentProfileScreen;
