import React from 'react';
import { Text, TextInput, View,StyleSheet } from "react-native";

const SellerFinance = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.ListStyle}>
<Text style={styles.TextStyle}>10:00</Text>
<View style={styles.view}></View>
<Text style={styles.TextStyle}>170 c</Text>
      </View>
      <View style={styles.ListStyle}>
<Text style={styles.TextStyle}>19:45</Text>
<View style={styles.view}></View>
<Text style={styles.TextStyle}>300 c</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  TextStyle:{
    fontSize:40,
    margin:10,
    marginLeft:40,
    borderRadius:10,
    width:150,
    height:50,
    textAlign:'center'
  },
  ListStyle:{
    justifyContent:'flex-start',
    flexDirection:'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius:10,
    margin:5,
  },
  view:{
    width:1,
    borderColor: 'black',
    borderWidth: 1,
  }
});

export default SellerFinance;
