import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grey, teal} from 'material-ui-colors';
import {FAB} from 'react-native-paper';
import TopUpYourAccount from './TopUpYourAccount';
import {img} from 'react-native/Libraries/Animated/AnimatedWeb';
import AddStudentScreen from './AddStudentScreen';
const ParentHomeScreen = ({navigation}) => {
  const [nameItem, setNameItem] = useState([]);

  // const deletName = index => {
  //   let itemsCopy = [...nameItem];
  //   itemsCopy.splice(index, 1);
  //   setNameItem(itemsCopy);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tasksWrapper}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.Sumcontainer}>
              <Text style={styles.addSum}>9999</Text>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 14,
                  fontWeight: '500',
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  textDecorationColor: 'black',
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
          data={[
            {
              key: 'Балтабаев Баястан',
              number: '+996771717171',
              school: 'Макаренко',
              img: 'https://www.csudh.edu/Assets/csudh-sites/asianpacific/images/Faculty/No%20Avatar.jpg',
            },
            {
              key: 'Балтабаев Баястан',
              number: '+996771717171',
              school: 'Макаренко',
              img: 'https://www.csudh.edu/Assets/csudh-sites/asianpacific/images/Faculty/No%20Avatar.jpg',
            },
            {
              key: 'Балтабаев Баястан',
              number: '+996771717171',
              school: 'Макаренко',
              img: 'https://www.csudh.edu/Assets/csudh-sites/asianpacific/images/Faculty/No%20Avatar.jpg',
            },
            {
              key: 'Балтабаев Баястан',
              number: '+996771717171',
              school: 'Макаренко',
              img: 'https://www.csudh.edu/Assets/csudh-sites/asianpacific/images/Faculty/No%20Avatar.jpg',
            },
            {
              key: 'Балтабаев Баястан',
              number: '+996771717171',
              school: 'Макаренко',
              img: 'https://www.csudh.edu/Assets/csudh-sites/asianpacific/images/Faculty/No%20Avatar.jpg',
            },
          ]}
          keyExtractor={({item, i}) => i}
          renderItem={({item}) => {
            return (
              <>
                <View style={styles.itemAdd}>
                  <View style={styles.itemLeft}>
                    <Image
                      style={styles.square}
                      source={{
                        uri: item.img,
                      }}
                    />
                  </View>
                  <View style={styles.DataView}>
                    <Text style={styles.itemText}>{item.key}</Text>
                    <Text style={styles.itemSchool}>Школа: {item.school}</Text>
                    <Text style={styles.itemNumber}>{item.number}</Text>
                  </View>
                </View>
              </>
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
