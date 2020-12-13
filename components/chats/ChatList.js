import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import LightHeader from '../layouts/LightHeader';

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

          <FlatList
            data={users}
            renderItem={renderUser}
            keyExtractor={(item) => item.id.toString()}
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
  },
});
