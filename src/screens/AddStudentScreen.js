import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput, List} from 'react-native-paper';
import {grey, teal} from 'material-ui-colors';

const AddStudentScreen = () => {
  const [addNumber, setAddNumber] = useState('');
  const [addName, setAddName] = useState();
  const [nameItem, setNameItem] = useState([]);
  const [visible, setVisible] = useState(false);

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  const handleAddName = () => {
    setNameItem([...nameItem, addName]);
    setAddName(null);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgProfile}
        source={{
          uri: 'https://icons-for-free.com/iconfiles/png/512/profile+profile+page+user+icon-1320186864367220794.png',
        }}
      />
      <TextInput
        label="Полное имя"
        // value={addName}
        onChangeText={text => setAddName(text)}
        style={styles.input}
      />

      <TextInput
        label="Номер телефона"
        style={styles.input}
        // value={addNumber}
        keyboardType={'phone-pad'}
        onChangeText={text => setAddNumber(text)}
      />
      <List.Section title="Выберите регион">
        <List.Accordion title="Ош" onPress={handlePress} expanded={expanded}>
          <FlatList
            data={[
              {key: 'Бишкек'},
              {key: 'Ош'},
              {key: 'Жалал-Абад'},
              {key: 'Нарын'},
              {key: 'Талас'},
              {key: 'Баткен'},
              {key: 'Ыссык-кол'},
            ]}
            keyExtractor={({item, i}) => i}
            renderItem={({item}) => {
              return <List.Item title={`${item.key}`} />;
            }}
          />
        </List.Accordion>
      </List.Section>

      <Button
        onPress={() => handleAddName()}
        style={styles.inputBtn}
        //  disabled={addInput}
        color={grey[100]}>
        Сохранить
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 55,
    marginVertical: 8,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBtn: {
    backgroundColor: teal[800],
    paddingHorizontal: 80,
    marginTop: 20,
  },
  imgProfile: {
    width: 120,
    height: 120,
    borderRadius: 50,
  },
});

export default AddStudentScreen;
