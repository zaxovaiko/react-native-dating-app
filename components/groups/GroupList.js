import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import LightHeader from '../layouts/LightHeader';
import { useHistory } from "react-router-dom";

import Loading from './Loading';

const GroupList = props => {
    let history = useHistory();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firestore()
          .collection('rooms')
          .onSnapshot(querySnapshot => {
            const rooms = querySnapshot.docs.map(documentSnapshot => {
              return {
                _id: documentSnapshot.id,
                name: '',
                ...documentSnapshot.data()
              };
            });
    
            setRooms(rooms);
    
            if (loading) {
              setLoading(false);
            }
          });
        return () => unsubscribe();
      }, []);
    
      if (loading) {
        return <Loading />;
      }

    return (
        <View style={styles.container}>
            <LightHeader title="Join to a themathic room" />
            <FlatList
                data={rooms}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => history.push({pathname: '/groups/groupchatting', state: item})}
                  >
                    <List.Item
                        title={item.name}
                        description='Item description'
                        titleNumberOfLines={1}
                        titleStyle={styles.listTitle}
                        descriptionStyle={styles.listDescription}
                        descriptionNumberOfLines={1}
                    />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
};
export default GroupList;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f5f5',
      flex: 1
    },
    listTitle: {
      fontSize: 22
    },
    listDescription: {
      fontSize: 16
    }
  });

