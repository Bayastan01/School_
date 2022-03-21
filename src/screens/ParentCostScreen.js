import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Avatar, Divider} from 'react-native-paper';
import requester from '../utils/requester';
import moment from 'moment';
import {grey, red} from 'material-ui-colors';
import numberSeparator from 'number-separator';
import {getImageUrl} from '../utils';
import {ITEMS_PER_PAGE} from '../utils/settings';

const ParentCostScreen = () => {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [page, setPage] = useState(2);
  const [changingPage, setChangingPage] = useState(false);
  const [stopNextPage, setStopNextPage] = useState(false);

  const fetchItems = () => {
    if (busy || changingPage) {
      return;
    }
    setPage(2);
    setStopNextPage(false);
    setBusy(true);
    requester
      .get('parent/transaction/consumption')
      .then(res => {
        setItems(res.payload);
        setStopNextPage(res.payload.length < ITEMS_PER_PAGE);
      })
      .finally(() => {
        setBusy(false);
      });
  };

  const nextPage = () => {
    if (changingPage || stopNextPage || busy) {
      return;
    }
    setChangingPage(true);
    requester
      .get('parent/transaction/consumption', {page})
      .then(res => {
        setItems(p => [...p, ...res.payload]);
        setStopNextPage(res.payload.length < ITEMS_PER_PAGE);
        setPage(p => p + 1);
      })
      .finally(() => {
        setChangingPage(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <FlatList
      contentContainerStyle={{padding: 8}}
      style={{flex: 1}}
      keyExtractor={item => item.id}
      data={items}
      onEndReached={() => nextPage()}
      ListFooterComponent={
        changingPage ? (
          <View
            justifyContent={'center'}
            alignItems={'center'}
            style={{height: 100}}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      onRefresh={() => fetchItems()}
      refreshing={busy}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({item}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 8,
              marginHorizontal: 12,
              alignItems: 'center',
            }}>
            <Avatar.Image
              size={50}
              source={{uri: getImageUrl(item.student.picture.path)}}
            />
            <View
              style={{
                flexGrow: 1,
                marginLeft: 12,
              }}>
              <Text style={styles.title}>
                {item.store ? item.store.title : 'За QR карту'}
              </Text>
              <Text style={{color: grey[900]}}>{item.student.full_name}</Text>
              <Text style={{color: grey[700]}}>
                {moment(item.created_at).calendar()}
              </Text>
            </View>
            <Text style={styles.amount}>
              -{numberSeparator(item.amount)}{' '}
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
    color: red[900],
  },
});

export default ParentCostScreen;
