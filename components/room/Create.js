import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, Chip, Portal, Dialog} from 'react-native-paper';
import {
  input,
  page,
  colors,
  flexContainer,
  container,
  fixedBtn,
  transparentHeader,
} from '../../styles/index';
import LightHeader from '../layouts/LightHeader';
import {getTagByName} from '../../api/tags';

function Create() {
  const [rooms, setRooms] = useState({
    name: '',
    topic: '',
  });
  const [tags, setTags] = useState([]);
  const [showTagModal, setShowTagModal] = useState(false);
  const [choosedTags, setChoosedTags] = useState([]);
  const [tag, setTag] = useState('');

  function findTag(text) {
    setTag(text);
    if (text.length > 1) {
      getTagByName(text)
        .then((docs) => setChoosedTags(docs.docs.map((e) => e.data())))
        .catch((err) => console.log(err, 'Setup getTagByName error'));
    }
  }

  function addToTags(tg) {
    if (tags.indexOf(tg) !== -1) {
      return;
    }
    setTags((p) => [...p, tg]);
  }


  return (
    <View style={{...styles.page, ...styles.bg}}>
      <LightHeader title="New thematic room" />

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

      <View style={{...styles.container, ...styles.flexContainer}}>
        <View>
          <TextInput
            style={styles.input}
            label="Room name"
            value={rooms.name}
            underlineColor="transparent"
            onChangeText={(text) => setRooms((p) => ({...p, name: text}))}
          />
          <TextInput
            style={styles.input}
            label="Room topic"
            value={rooms.topic}
            underlineColor="transparent"
            onChangeText={(text) => setRooms((p) => ({...p, topic: text}))}
          />

          <View>
            <Text style={{fontWeight: 'bold', marginBottom: 10, marginLeft: 5}}>
              Interests
            </Text>
            
            <View style={styles.row}>
              {tags.map((tg, i) => (
                <Chip
                  key={i}
                  mode="outlined"
                  style={styles.chips}
                  onPress={() => setTags((p) => p.filter((_, idx) => idx !== i))}>
                  {tg}
                </Chip>
              ))}
              <Chip
              mode="outlined"
              style={styles.chips}
              onPress={() => setShowTagModal(true)}>
              +
              </Chip>
            </View>
          </View>
        </View>

        <Button style={styles.fixedBtn} mode="contained">
          Create
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page,
  container,
  flexContainer,
  input,
  fixedBtn,
  transparentHeader,
  chip: {marginRight: 5, marginBottom: 4},
  bg: colors.white,
  findTag: {
    borderRadius: 5,
    marginBottom: 10,
  },
  chips: {
    marginBottom: 10,
    marginRight: 5,
  },
  row: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});

export default Create;
