import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import {green, teal} from 'material-ui-colors';
import requester from '../utils/requester';
import moment from 'moment';

const ParentPaymentScreen = () => {
  const [payments, setItems] = useState([]);

  useEffect(() => {
    requester
      .get('parent/transaction/payment')
      .then(res => {
        setItems(res.payload);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <FlatList
      style={{padding: 8}}
      keyExtractor={item => item.id}
      data={payments}
      ItemSeparatorComponent={() => <Divider />}
      ListHeaderComponent={
        <Button
          icon="plus"
          style={{marginBottom: 8}}
          mode="contained"
          color={teal[700]}>
          Пополнить счет
        </Button>
      }
      renderItem={({item}) => (
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 8,
            alignItems: 'center',
          }}>
          <View style={{flexGrow: 1}}>
            <Text>{moment(item.created_at).calendar()}</Text>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: green[900],
              fontWeight: 'bold',
            }}>
            +{item.amount}{' '}
            <Text style={{textDecorationLine: 'underline'}}>с</Text>
          </Text>
        </View>
      )}
    />
  );
};

export default ParentPaymentScreen;
