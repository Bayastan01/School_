import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import requester from '../utils/requester';
import moment from 'moment';

const ParentCostScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    requester
      .get('parent/transaction/consumption')
      .then(res => {
        console.log(res);
        setItems(res.payload);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={({item, i}) => i}
        data={items}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 8,
                marginHorizontal: 16,
              }}>
              <Avatar.Image
                size={80}
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTHxHKq92yNEVYlgiRzFFKoG-h0_kYI9ouhtE3oGoh0OFlMf75alT_YvYzQOR1qVXB1s0&usqp=CAU',
                }}
              />
              <View
                style={{
                  flexGrow: 1,
                  marginLeft: 12,
                  alignItems: 'flex-start',
                }}>
                <Text style={styles.title}>{item.store.title}</Text>
                <Text>{item.student.full_name}</Text>
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
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  amount: {
    alignItems: 'flex-end',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default ParentCostScreen;
