import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Avatar, Button, Divider} from 'react-native-paper';
import {teal} from 'material-ui-colors';
import requester from '../utils/requester';
import moment from "moment";

const ParentPaymentScreen = () => {
  const [paymont, setPaymont] = useState([]);
  useEffect(() => {
    requester
      .get('parent/transaction/payment')
      .then(res => {
        console.log(res);
        setPaymont(res.payload);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Button icon="plus" mode="contained" color={teal[700]}>
        Пополнения счета
      </Button>
      <FlatList
        keyExtractor={({item, i}) => i}
        data={paymont}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => {
          return (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 8,
                  marginHorizontal: 16,
                }}>
                <View
                  style={{
                    flexGrow: 1,
                    marginLeft: 12,
                    alignItems: 'flex-start',
                  }}>
                  <Text>
                    {moment(item.created_at).format('MMMM Do YYYY, h:mm:ss ')}
                  </Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.amount}>
                    +{item.amount}{' '}
                    <Text style={{textDecorationLine: 'underline'}}>с</Text>
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default ParentPaymentScreen;
