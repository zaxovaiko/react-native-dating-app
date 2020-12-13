import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {useHistory, Link} from 'react-router-native';
import {Appbar, Text, TextInput} from 'react-native-paper';

function Correspondence() {
  const history = useHistory();

  return (
    <View style={styles.scroll}>
      <Appbar.Header
        dark={false}
        style={{
          backgroundColor: '#fff',
          borderColor: 'transparent',
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        }}>
        <Appbar.BackAction onPress={() => history.goBack()} />
        <Appbar.Content
          title={
            <View
              style={{
                ...styles.page,
                ...styles.container,
                ...styles.FlexStyle,
              }}>
              <ImageBackground
                style={{...styles.chatImg, flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: 'https://via.placeholder.com/150',
                  }}
                  style={{...styles.peopleIcon}}
                />
                <View style={{...styles.chatView}}>
                  <Link to="/chats/groupchats">
                    <Text style={styles.chatText0}>Marcin</Text>
                  </Link>
                  <Link to="">
                    <Text style={styles.chatText1}>typing...</Text>
                  </Link>
                </View>
              </ImageBackground>
            </View>
          }
        />
      </Appbar.Header>

      <ScrollView />

      <View style={styles.container}>
        <TextInput style={styles.input} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    height: 50,
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
  chatRows: {
    flexDirection: 'row',
  },
  chatImg: {
    width: '95%',
    height: 70,
    marginLeft: 9,
    marginBottom: 15,
    borderColor: '#000',
  },
  chatView: {
    top: 20,
    marginLeft: 10,
  },
  chatText0: {
    fontSize: 20,
  },
  chatText1: {
    fontSize: 11,
    marginLeft: 1,
  },
  FlexStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  peopleIcon: {
    width: 50,
    top: 18,
    borderRadius: 150,
    height: 50,
  },
});

export default Correspondence;
