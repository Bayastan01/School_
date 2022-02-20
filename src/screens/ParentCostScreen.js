import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import requester from '../utils/requester';
import moment from 'moment';
import {grey, red} from 'material-ui-colors';

const ParentCostScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    requester
      .get('parent/transaction/consumption')
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
      data={items}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({item}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 8,
              marginHorizontal: 16,
              alignItems: 'center',
            }}>
            <Avatar.Image
              size={50}
              source={require('../assets/no_avatar.jpg')}
            />
            <View
              style={{
                flexGrow: 1,
                marginLeft: 12,
                alignItems: 'flex-start',
              }}>
              <Text style={styles.title}>{item.store.title}</Text>
              <Text style={{color: grey[900]}}>{item.student.full_name}</Text>
              <Text style={{color: grey[700]}}>
                {moment(item.created_at).calendar()}
              </Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.amount}>
                -{item.amount}{' '}
                <Text style={{textDecorationLine: 'underline'}}>с</Text>
              </Text>
            </View>
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
    alignItems: 'flex-end',
    fontSize: 20,
    fontWeight: 'bold',
    color: red[900],
  },
});

export default ParentCostScreen;
