import React from 'react';
import {Image, Text, View} from 'react-native';
import {Avatar, Headline} from 'react-native-paper';
import {teal} from 'material-ui-colors';

const StudentStack = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 18,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <Avatar.Image
          size={200}
          source={{
            uri: 'https://www.gannett-cdn.com/presto/2018/08/14/PTAL/6e4fff76-595d-4069-9112-cfe15dbfaa43-IMG_Stadium.jpeg?width=660&height=319&fit=crop&format=pjpg&auto=webp',
          }}
        />
      </View>
      <View
        style={{
          alignSelf: 'stretch',
          backgroundColor: 'red',
          flexGrow: 1,
          marginTop: 18,
        }}>
        <Image
          style={{
            flexGrow: 1,
          }}
          source={{
            uri: 'https://www.kaspersky.ru/content/ru-ru/images/repository/isc/2020/9910/a-guide-to-qr-codes-and-how-to-scan-qr-codes-2.png',
          }}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Headline style={{fontSize: 28, marginTop: 18, color: '#7d7d7d'}}>
          Асан Асанович
        </Headline>
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 80,
          fontWeight: 'bold',
          color: teal[900],
        }}>
        200 с
      </Text>
    </View>
  );
};

export default StudentStack;
