import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider, Button, Portal, Dialog, TextInput, Text, Chip } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import LightHeader from '../layouts/LightHeader';
import { useHistory } from "react-router-dom";
import {getTagByName} from '../../api/tags';
import {
  colors,
} from '../../styles/index';

import Loading from './Loading';

const GroupList = props => {
    let history = useHistory();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const [showTagModal, setShowTagModal] = useState(false);
    const [choosedTags, setChoosedTags] = useState([]);
    const [tag, setTag] = useState('');
    var [check, showRoomWithTags] = useState(false);

    function findTag(text) {
      setTag(text);
      if (text.length > 1) {
        getTagByName(text)
          .then((tags) => setChoosedTags(tags))
          .catch((err) => console.log(err, 'Setup getTagByName error'));
      }
    }
  
    function addToTags(tg) {
      if (tags.indexOf(tg) !== -1) {
        return;
      }
      setTags((p) => [...p, tg]);
    }

    function find() {
      for (var i = 0; i < rooms.length; i++) {
        for (var j = 0; j < rooms[i].tags.length; j++) {
          for (var k = 0; k < tags.length; k++) {
            if (tags[k] == rooms[i].tags[j]) {
              console.log('Success!')
              showRoomWithTags(true);
            }
          }
        }
      }
    }


    useEffect(() => {
      
        const unsubscribe = firestore()
          .collection('rooms')
          .onSnapshot(querySnapshot => {
            const rooms = querySnapshot.docs.map(documentSnapshot => {
              return {
                _id: documentSnapshot.id,
                name: '',
                topic: '',
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

            <Portal>
              <Dialog
                visible={showTagModal}
                onDismiss={() => setShowTagModal((p) => !p)}>
              <Dialog.Title>Add interests</Dialog.Title>
              <Dialog.Content>
                <TextInput
                placeholder="Type word"
                underlineColor="transparent"
                mode="flat"
                style={styles.findTag}
                onChangeText={(text) => findTag(text)}
                value={tag}
                />
                <View style={styles.row}>
                  {choosedTags.length === 0 && <Text>Nothing was found</Text>}
                  {choosedTags.length !== 0 &&
                  choosedTags.map((tg, i) => (
                <Chip
                  key={i}
                  mode="outlined"
                  style={styles.chips}
                  onPress={() => addToTags(tg.name)}>
                  {tg.name}
                </Chip>
                ))}
                </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setShowTagModal(false)}>Close</Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>

            <View>
              <Text style={{fontWeight: 'bold', marginTop: 10, marginLeft: 10}}>
                Choose your interests
              </Text>

              
              <View style={styles.row}>
                {tags.map((tg, i) => (
                  <Chip
                    key={i}
                    mode="outlined"
                    style={styles.chips}
                    onPress={() =>
                    setTags((p) => p.filter((_, idx) => idx !== i))
                    }>
                    {tg}
                  </Chip>
                ))}
                  <Chip
                    mode="outlined"
                    style={styles.chips}
                    onPress={() => setShowTagModal(true)}>
                    +
                  </Chip>
                  <Button onPress={() => find()}>Find</Button>
                </View>
              </View>
            
              { check ?
                <FlatList 
                data={rooms}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({ item }) => (
                  <View style={{}}>
                    <View>
                      <List.Item
                        title={item.name}
                        description={"Topic: " + item.topic}
                        titleNumberOfLines={1}
                        titleStyle={styles.listTitle}
                        descriptionStyle={styles.listDescription}
                        descriptionNumberOfLines={1}
                      />
                    </View>
                    
                    <View>
                    <Button 
                      style={styles.fixedBtn} 
                      mode="contained"
                      onPress={() => history.push({pathname: '/groups/groupchatting', state: item})}>
                      Join
                    </Button>
                    </View>
                  </View>
                )}
            >
            </FlatList>
               : console.log("Error")}
            
        </View>
    )
};
export default GroupList;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f5f5',
      flex: 1,
      
    },
    listTitle: {
      fontSize: 22
    },
    listDescription: {
      fontSize: 16
    }, 
    fixedBtn: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginTop: 'auto'
    },
    findTag: {
    borderRadius: 5,
    marginBottom: 10,
    },
    chips: {
    marginBottom: 20,
    marginLeft: 8,
    },
    row: {
    //marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  });

