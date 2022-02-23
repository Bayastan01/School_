import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import {green, teal} from 'material-ui-colors';
import requester from '../utils/requester';
import moment from 'moment';
import numberSeparator from 'number-separator';
import {useNavigation} from '@react-navigation/native';

const ParentPaymentScreen = () => {
  const [payments, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const navigation = useNavigation();

  const fetchItems = () => {
    if (busy) {
      return;
    }
    setBusy(true);
    requester
      .get('parent/transaction/payment')
      .then(res => {
        setItems(res.payload);
      })
      .finally(() => {
        setBusy(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <FlatList
      onRefresh={() => fetchItems()}
      refreshing={busy}
      style={{padding: 8}}
      keyExtractor={item => item.id}
      data={payments}
      ItemSeparatorComponent={() => <Divider />}
      ListHeaderComponent={
        <Button
          icon="plus"
          style={{marginBottom: 8}}
          mode="contained"
          onPress={() => navigation.navigate('ReplenishBalance')}
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
            +{numberSeparator(item.amount)}{' '}
            <Text style={{textDecorationLine: 'underline'}}>с</Text>
          </Text>
        </View>
      )}
    />
  );
};

export default ParentPaymentScreen;
