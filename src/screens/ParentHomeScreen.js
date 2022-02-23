import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grey, teal} from 'material-ui-colors';
import {FAB} from 'react-native-paper';
import requester from '../utils/requester';
import {getImageUrl, useAppSelector} from '../utils';
import {useIsFocused} from '@react-navigation/native';
import numberSeparator from 'number-separator';

const ParentHomeScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const parent = useAppSelector(state => state.app.parent);

  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);

  // const deleteName = index => {
  //   let itemsCopy = [...nameItem];
  //   itemsCopy.splice(index, 1);
  //   setNameItem(itemsCopy);
  // };

  const fetchStudents = () => {
    if (busy) {
      return;
    }
    setBusy(true);
    requester
      .get('parent/student')
      .then(res => {
        setItems(res.payload);
        console.log(res);
      })
      .finally(() => {
        setBusy(false);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchStudents();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{padding: 8}}
        refreshing={busy}
        onRefresh={() => fetchStudents()}
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: grey[100],
              padding: 20,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              flex: 1,
              marginBottom: 10,
            }}>
            <View flexGrow={1} flexDirection={'row'}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 22,
                  fontWeight: '500',
                }}>
                {numberSeparator(parent.balance) + ' '}
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '500',
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  textDecorationColor: '#000',
                  color: '#111',
                }}>
                с
              </Text>
            </View>
            <MaterialCommunityIcons
              onPress={() => navigation.navigate('ReplenishBalance')}
              name="cash-plus"
              style={{color: teal[900]}}
              size={35}
            />
          </View>
        }
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('ParentStudent', {item})}>
              <View style={styles.itemAdd}>
                <View style={{marginRight: 8}}>
                  <Image
                    style={styles.square}
                    source={{uri: getImageUrl(item.picture.path)}}
                  />
                </View>
                <View>
                  <Text style={styles.itemText}>{item.full_name}</Text>
                  <Text style={styles.itemSchool}>
                    Лимит: {numberSeparator(item.limit)} сом
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <FAB
        style={styles.fab}
        icon="account-plus-outline"
        onPress={() => navigation.navigate('AddStudentScreen')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  fab: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    backgroundColor: teal[900],
  },
  square: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  itemAdd: {
    marginBottom: 8,
    backgroundColor: grey[100],
    padding: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemText: {
    color: grey[900],
    fontSize: 14,
  },
  itemSchool: {
    color: grey[800],
    marginVertical: 5,
    fontSize: 12,
  },
});

export default ParentHomeScreen;
