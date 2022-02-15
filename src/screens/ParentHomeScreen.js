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
import TopUpYourAccount from './TopUpYourAccount';
import requester from '../utils/requester';
import {useAppSelector} from '../utils';
import AddStudentScreen from './AddStudentScreen';
import ParentStudent from './ParentStudent';

const ParentHomeScreen = ({navigation}) => {
  const [nameItem, setNameItem] = useState([]);
  const parent = useAppSelector(state => state.app.parent);

  // const deletName = index => {
  //   let itemsCopy = [...nameItem];
  //   itemsCopy.splice(index, 1);
  //   setNameItem(itemsCopy);
  // };

  useEffect(() => {
    requester
      .get('parent/student')
      .then(res => {
        console.log(res);
        setNameItem(res.payload);
      })
      .catch(err => {});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tasksWrapper}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.Sumcontainer}>
              <Text style={styles.addSum}>{parent.balance + ' '}</Text>
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
              <MaterialCommunityIcons
                onPress={() => navigation.navigate('TopUpYourAccount')}
                name="cash-plus"
                style={{
                  color: teal[900],
                  position: 'absolute',
                  top: 20,
                  right: 25,
                }}
                size={35}
              />
            </View>
          }
          data={nameItem}
          keyExtractor={({item, i}) => i}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ParentStudent', {id: item.id})
                }>
                <View style={styles.itemAdd}>
                  <View style={styles.itemLeft}>
                    <Image
                      style={styles.square}
                      source={{
                        uri: 'https://www.csudh.edu/Assets/csudh-sites/asianpacific/images/Faculty/No%20Avatar.jpg',
                      }}
                    />
                  </View>
                  <View style={styles.DataView}>
                    <Text style={styles.itemText}>{item.full_name}</Text>
                    <Text style={styles.itemSchool}>Лимит : {item.limit}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
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
  tasksWrapper: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: teal[900],
  },
  addSum: {
    color: 'black',
    fontSize: 22,
    fontWeight: '500',
  },
  Sumcontainer: {
    backgroundColor: grey[100],
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  square: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 15,
  },
  itemAdd: {
    marginVertical: 10,
    backgroundColor: grey[100],
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemText: {
    maxWidth: '80%',
    color: 'black',
    fontSize: 13,
  },
  itemSchool: {
    maxWidth: '80%',
    color: 'black',
    marginVertical: 5,
    fontSize: 12,
  },
  itemNumber: {
    fontSize: 12,
  },
  DataView: {
    flex: 1,
  },
});

export default ParentHomeScreen;
