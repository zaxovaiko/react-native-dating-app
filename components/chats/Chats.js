import React from 'react';
import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import {Link} from 'react-router-native';
import {Text} from 'react-native-paper';
import {
  scroll,
  page,
  container,
  input,
  chatImg,
  chatView,
  chatText0,
  chatText,
  chatText2,
  chatText3,
  FlexStyle,
  peopleIcon,
} from '../../styles/index';
import LightHeader from '../layouts/LightHeader';

const messages = [
  {name: 'Jessica', msg: 'Hello, world!', time: 'now'},
  {name: 'Jessica', msg: 'Hello, world!', time: 'now'},
  {name: 'Jessica', msg: 'Hello, world!', time: 'now'},
];

function Chats() {
  return (
    <View style={styles.scroll}>
      <LightHeader title="Messages" />

      <View style={{...styles.page, ...styles.container, ...styles.FlexStyle}}>
        <ImageBackground style={styles.chatImg}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={styles.peopleIcon}
          />
          <View style={styles.chatView}>
            <Link to="/chats/groupchats">
              <Text style={styles.chatText0}>Groups</Text>
            </Link>
          </View>
        </ImageBackground>

        {messages.map(({name, msg, time}, i) => (
          <ImageBackground style={{...styles.chatImg}} key={i}>
            <Image
              source={{uri: 'https://via.placeholder.com/150'}}
              style={{...styles.peopleIcon}}
            />
            <View style={styles.chatView}>
              <View>
                <Link to="/profile">
                  <Text style={styles.chatText}>{name}</Text>
                </Link>
                <Link to="/chats">
                  <Text style={styles.chatText2}>{msg}</Text>
                </Link>
              </View>
              <Text style={styles.chatText3}>{time}</Text>
            </View>
          </ImageBackground>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll,
  container,
  page,
  input,
  chatImg,
  chatView,
  chatText0,
  chatText,
  chatText2,
  chatText3,
  FlexStyle,
  peopleIcon,
});

export default Chats;
