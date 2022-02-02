import React from 'react';
import {  View } from "react-native";
import { TextInput,List,Text } from 'react-native-paper';
const SellerFinanceOtchet = () => {
  return (
    <>
    <View style={{flex: 1}}>
      <View style={{justifyContent:'flex-start',
flexDirection:'row',}}>
      <List.Item
          title="Putin Vladimir" 
          style={{width:300,}}
          left={props => <List.Icon {...props} icon="image" />}
        />
        <Text style={{fontSize:30,margin:7,}}>550 c</Text>
      </View>

      <View style={{justifyContent:'flex-start',
flexDirection:'row',}}>
      <List.Item
          title="Putin Vladimir" 
          style={{width:300,}}
          left={props => <List.Icon {...props} icon="image" />}
        />
        <Text style={{fontSize:30,margin:7,}}>550 c</Text>
      </View>
    </View>
    </>
  );
};
export default SellerFinanceOtchet;
