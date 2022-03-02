import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import requester from '../utils/requester';
import moment from 'moment';
import {green, grey} from 'material-ui-colors';
import numberSeparator from 'number-separator';
import {getImageUrl} from '../utils';

const StoreFinancePaymentsScreen = () => {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);

  const fetchItems = () => {
    if (busy) {
      return;
    }
    setBusy(true);
    requester
      .get('store/transaction/payment')
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
      style={{padding: 8}}
      keyExtractor={item => item.id}
      data={items}
      onRefresh={() => fetchItems()}
      refreshing={busy}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({item}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              padding: 8,
              alignItems: 'center',
            }}>
            <Avatar.Image
              size={50}
              source={{uri: getImageUrl(item.student.picture.path)}}
            />
            <View
              style={{
                flexGrow: 1,
                marginLeft: 10,
              }}>
              <Text style={styles.title}>{item.employee.full_name}</Text>
              <Text style={{color: grey[900]}}>{item.student.full_name}</Text>
              <Text style={{color: grey[700]}}>
                {moment(item.created_at).calendar()}
              </Text>
            </View>
            <Text style={styles.amount}>
              +{numberSeparator(item.amount)}{' '}
              <Text style={{textDecorationLine: 'underline'}}>с</Text>
            </Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    color: grey[900],
    fontWeight: '500',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: green[900],
  },
});

export default StoreFinancePaymentsScreen;
