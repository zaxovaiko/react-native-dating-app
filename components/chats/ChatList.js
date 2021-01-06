import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LightHeader from '../layouts/LightHeader';
import {Link} from 'react-router-native';
import {Caption} from 'react-native-paper';

export default function ChatList({users, onClickUser}) {
  const renderUser = ({item}) => {
    return (
      <Pressable onPress={() => onClickUser(item)} style={styles.row}>
        <Image style={styles.img} source={{uri: item.img}} />
        <Text>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <LightHeader title="Messages" />

          <View style={styles.row}>
            <ImageBackground style={styles.img} />
            <Link component={TouchableOpacity} to="/groups">
              <Caption>Groups</Caption>
            </Link>
          </View>

          <FlatList
            data={users}
            renderItem={renderUser}
            keyExtractor={(item) => item.uid.toString()}
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  img: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 300,
    backgroundColor: 'black',
  },
});
