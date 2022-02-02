import React, {useState} from 'react';
import {
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

const ParentHomeScreen = ({navigation}) => {
  const [nameItem, setNameItem] = useState([]);

  const deletName = index => {
    let itemsCopy = [...nameItem];
    itemsCopy.splice(index, 1);
    setNameItem(itemsCopy);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View style={styles.Sumcontainer}>
          <Text style={styles.addSum}>
            9999
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                textDecorationColor: '#000',
              }}>
              С
            </Text>
          </Text>
          <MaterialCommunityIcons
            onPress={() => navigation.navigate('TopUpYourAccount')}
            name="cash-plus"
            style={{color: teal[900], position: 'absolute', top: 20, right: 15}}
            size={35}
          />
        </View>

        <View style={styles.itemAdd}>
          <View style={styles.itemLeft}>
            <Image
              style={styles.square}
              source={{
                uri: 'https://icons-for-free.com/iconfiles/png/512/profile+profile+page+user+icon-1320186864367220794.png',
              }}
            />
          </View>
          <View style={styles.DataView}>
            <Text style={styles.itemText}>Балтабаев Баястан</Text>
            <Text style={styles.itemSchool}>Школа Макаренко</Text>
            <Text style={styles.itemNumber}>+996777177727</Text>
          </View>
        </View>
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
    paddingTop: 20,
    paddingHorizontal: 20,
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
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
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
    marginBottom: 20,
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
