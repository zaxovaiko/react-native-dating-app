import React from 'react';
import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import {Link} from 'react-router-native';
import {Text} from 'react-native-paper';
import LightHeader from '../layouts/LightHeader';

function Chats() {
  return (
    <View style={styles.scroll}>
      <LightHeader title="Messages" />

      <View style={{...styles.page, ...styles.container, ...styles.FlexStyle}}>
        <ImageBackground style={{...styles.chatImg}}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={{...styles.peopleIcon}}
          />
          <View style={styles.chatView}>
            <View>
              <Link to="/groups/groupchat">
                <Text style={styles.chatText0}>Groups</Text>
              </Link>
            </View>
          </View>
        </ImageBackground>
        <ImageBackground style={{...styles.chatImg}}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={{...styles.peopleIcon}}
          />
          <View style={styles.chatView}>
            <View>
              <Link to="/">
                <Text>Jessica</Text>
              </Link>
              <Link to="/chats/u">
                <Text>Lunch today?</Text>
              </Link>
            </View>
            <Text style={styles.chatText3}>now</Text>
          </View>
        </ImageBackground>
        <ImageBackground style={styles.chatImg}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={{...styles.peopleIcon}}
          />

          <View style={styles.chatView}>
            <View>
              <Link to="/">
                <Text>Ola</Text>
              </Link>
              <Link to="/chats/u">
                <Text>Hello! Nice photos :)</Text>
              </Link>
            </View>
            <Text style={styles.chatText3}>17:15</Text>
          </View>
        </ImageBackground>
        <ImageBackground style={styles.chatImg}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={{...styles.peopleIcon}}
          />

          <View style={styles.chatView}>
            <View>
              <Link to="/">
                <Text>Mary</Text>
              </Link>
              <Link to="/chats/u">
                <Text>Same to you</Text>
              </Link>
            </View>
            <Text style={styles.chatText3}>today</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  page: {
    flex: 1,
    flexDirection: 'column',
  },
  chatImg: {
    width: '95%',
    height: 70,
    marginLeft: 9,
    marginBottom: 15,
    borderColor: '#000',
  },
  chatView: {
    top: -60,
    left: 80,
    width: '75%',
    height: 20,
    flexDirection: 'row',
  },
  chatText0: {
    top: 12,
    height: 50,
    width: 250,
  },
  chatText3: {
    marginLeft: 'auto',
  },
  FlexStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  peopleIcon: {
    width: 70,
    borderRadius: 150,
    height: 70,
  },
});

export default Chats;
