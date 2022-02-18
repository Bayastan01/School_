import React, {useState} from 'react';
import {StyleSheet, Text, View, StatusBar, Dimensions} from 'react-native';
import Row from './Calculator/Row';
import Button from './Calculator/Button';
import {Avatar, Headline} from 'react-native-paper';
import {teal} from 'material-ui-colors';
import {useNavigation} from '@react-navigation/native';
import requester from '../utils/requester';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
    justifyContent: 'flex-end',
  },
  value: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
});

function SellerStudentScreen({route}) {
  const navigation = useNavigation();
  const [state, setState] = useState('');
  const screenSize = Dimensions.get('window');
  const {data} = route.params;
  console.log(data);

  const take = () => {
    requester
      .post('store/student', {
        code: `BS${data.qr_code}`,
        sum: +state,
      })
      .then(res => {
        console.log(res);
        navigation.goBack();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <View style={{alignItems: 'center', margin: 5}}>
        <Avatar.Image
          size={(screenSize.height / 100) * 15}
          source={{
            uri: 'https://www.gannett-cdn.com/presto/2018/08/14/PTAL/6e4fff76-595d-4069-9112-cfe15dbfaa43-IMG_Stadium.jpeg?width=660&height=319&fit=crop&format=pjpg&auto=webp',
          }}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Headline style={{fontSize: 28, marginTop: 18, color: '#7d7d7d'}}>
          {data.full_name}
        </Headline>
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 80,
          fontWeight: 'bold',
          color: teal[900],
        }}>
        {data.balance} с
      </Text>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            height: 330,
          }}>
          <Text style={styles.value}>{state ? ` ${state} сом` : ''}</Text>
          <Row>
            <Button text="7" onPress={() => setState(s => s + '7')} />
            <Button text="8" onPress={() => setState(s => s + '8')} />
            <Button text="9" onPress={() => setState(s => s + '9')} />
          </Row>
          <Row>
            <Button text="4" onPress={() => setState(s => s + '4')} />
            <Button text="5" onPress={() => setState(s => s + '5')} />
            <Button text="6" onPress={() => setState(s => s + '6')} />
          </Row>
          <Row>
            <Button text="1" onPress={() => setState(s => s + '1')} />
            <Button text="2" onPress={() => setState(s => s + '2')} />
            <Button text="3" onPress={() => setState(s => s + '3')} />
          </Row>
          <Row>
            <Button
              text="0"
              size="double"
              onPress={() => setState(s => s + '0')}
            />
            <Button text="C" theme="secondary" onPress={() => setState('')} />
          </Row>
          <Row>
            <Button text="Забрать" theme="accent" onPress={take} />
          </Row>
        </View>
      </View>
    </>
  );
}

export default SellerStudentScreen;
