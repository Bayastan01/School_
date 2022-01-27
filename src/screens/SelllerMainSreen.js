import React from 'react';
import { Text, TextInput, View,Image,StyleSheet } from "react-native";

const SelllerMainSreen = () => {
  return (
    <>
    <View style={{flex: 1,alignItems:'center'}}>
      <Text style={{fontSize:80,marginTop:42}}>
        550 som
      </Text>
      <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://ru.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png',
        }}
      />
     </View>
      </View>
      </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 350,
    height: 350,
  },
 
});

export default SelllerMainSreen;
