import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Row from './Calculator/Row';
import Button from './Calculator/Button';
import {ActivityIndicator, Avatar, Headline} from 'react-native-paper';
import {teal} from 'material-ui-colors';
import {useNavigation} from '@react-navigation/native';
import requester from '../utils/requester';
import {getImageUrl, useAppDispatch} from '../utils';
import {incStoreBalance} from '../stores/appStore';
import {errorSound, successSound} from '../App';


const styles = StyleSheet.create({
  keyboard: {
    padding: 5,
    backgroundColor: 'white',
    color: 'black',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  info: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: 'black',
    fontSize: 40,
    textAlign: 'center',
    marginVertical: 10,
  },
});

function SellerStudentScreen({route}) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [state, setState] = useState('');
  const [busy, setBusy] = useState(false);

  const {data} = route.params;
  const screenSize = Dimensions.get('window');

  const take = () => {
    if (busy) {
      return;
    }
    setBusy(true);
    requester
      .post('store/student', {
        code: `BS${data.card.code}`,
        sum: +state,
      })
      .then(res => {
        dispatch(incStoreBalance(res.payload.amount));
        successSound.play();
        navigation.goBack();
      })
      .catch(e => {
        if (e.status === 'not_enough_balance') {
          setState('');
        }
        errorSound.play();
      })
      .finally(() => setBusy(false));
  };

  const keyPressed = key => {
    if (state.length === 3) return;
    setState(s => s + key);
  };

  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <View style={styles.info}>
        <Avatar.Image
          size={(screenSize.height / 100) * 20}
          source={{uri: getImageUrl(data.picture.path)}}
        />
        <Headline
          style={{
            fontSize: 25,
            textAlign: 'center',
            marginTop: 15,
            color: '#7d7d7d',
          }}>
          {data.full_name}
        </Headline>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 55,
            fontWeight: 'bold',
            color: teal[900],
          }}>
          {data.available_balance} с
        </Text>
      </View>
      <View style={styles.keyboard}>
        <Text style={styles.value}>{state ? ` ${state} сом` : ''}</Text>
        {busy ? (
          <View
            style={{
              minHeight: (screenSize.height / 100) * 30,
              width: screenSize.width - 10,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={50} />
          </View>
        ) : (
          <>
            <Row>
              <Button text="7" onPress={() => keyPressed('7')} />
              <Button text="8" onPress={() => keyPressed('8')} />
              <Button text="9" onPress={() => keyPressed('9')} />
            </Row>
            <Row>
              <Button text="4" onPress={() => keyPressed('4')} />
              <Button text="5" onPress={() => keyPressed('5')} />
              <Button text="6" onPress={() => keyPressed('6')} />
            </Row>
            <Row>
              <Button text="1" onPress={() => keyPressed('1')} />
              <Button text="2" onPress={() => keyPressed('2')} />
              <Button text="3" onPress={() => keyPressed('3')} />
            </Row>
            <Row>
              <Button text="C" theme="secondary" onPress={() => setState('')} />
              <Button
                text="0"
                disabled={state === ''}
                onPress={() => setState(s => s + '0')}
              />
              <Button
                text="Забрать"
                theme="accent"
                onPress={take}
                disabled={state === ''}
              />
            </Row>
          </>
        )}
      </View>
    </View>
  );
}

export default SellerStudentScreen;
