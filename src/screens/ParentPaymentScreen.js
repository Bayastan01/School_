import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, List} from 'react-native-paper';

const ParentPaymentScreen = () => {
  return (
    <View style={styles.container}>
      <Button icon="plus" mode="contained">
        Пополнения счета
      </Button>
      <FlatList
        data={[
          {key: 'Devin', price: 100},
          {key: 'Dan', price: 100},
          {key: 'Dominic', price: 100},
          {key: 'Jackson', price: 100},
          {key: 'James', price: 100},
          {key: 'Joel', price: 100},
          {key: 'John', price: 100},
          {key: 'Jillian', price: 100},
          {key: 'Jimmy', price: 100},
          {key: 'Julie', price: 100},
        ]}
        keyExtractor={({item, i}) => i}
        renderItem={({item}) => {
          return (
            <>
              <List.Section>
                <List.Item
                  title={`дата: кафе ${item.key}: покупал: ${item.price}с`}
                  left={() => <List.Icon icon="coffee" />}
                />
              </List.Section>
            </>
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
