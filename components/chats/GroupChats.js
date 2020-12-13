import React from 'react';
import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import {useHistory, Link} from 'react-router-native';
import {Appbar, Text} from 'react-native-paper';

function CreateGroupChats() {
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
        <Appbar.Content title="Group chats" />
      </Appbar.Header>

      <View style={{...styles.page, ...styles.container, ...styles.FlexStyle}}>
        <ImageBackground style={{...styles.chatImg}}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/150',
            }}
            style={{...styles.peopleIcon}}
          />
          <View style={styles.chatView}>
            <View>
              <Link to="">
                <Text style={styles.chatText}>Dream Team</Text>
              </Link>
              <View style={styles.chatRows}>
                <Link to="">
                  <Text style={{fontWeight: 'bold', marginRight: 5}}>
                    John:
                  </Text>
                </Link>
                <Link to="/chats/unique">
                  <Text>Lunch today?</Text>
                </Link>
              </View>
            </View>
            <Text style={styles.chatText3}>now</Text>
          </View>
        </ImageBackground>
        
        <ImageBackground style={{...styles.chatImg}}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/150',
            }}
            style={{...styles.peopleIcon}}
          />
          <View style={styles.chatView}>
            <View>
              <Link to="">
                <Text style={styles.chatText}>Students</Text>
              </Link>
              <View style={styles.chatRows}>
                <Link to="">
                  <Text style={{fontWeight: 'bold'}}>Mark: </Text>
                </Link>
                <Link to="/chats/unique">
                  <Text>Math starts at 13:15</Text>
                </Link>
              </View>
            </View>
            <Text style={styles.chatText3}>12:13</Text>
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

export default CreateGroupChats;
