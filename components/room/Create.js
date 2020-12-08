import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, Chip} from 'react-native-paper';
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

function Create() {
  const [rooms, setRooms] = useState({
    name: '',
    topic: '',
  });

  return (
    <View style={{...styles.page, ...styles.bg}}>
      <LightHeader title="New thematic room" />

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
            <Text style={{fontWeight: 'bold', marginBottom: 10}}>
              Interests
            </Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {['sport', 'cooking', 'instagram', 'books', 'movies'].map(
                (tag, i) => (
                  <Chip
                    key={i}
                    mode="outlined"
                    style={styles.chip}
                    onPress={() => console.log('Pressed')}>
                    {tag}
                  </Chip>
                ),
              )}
              <Chip
                mode="outlined"
                icon="plus"
                style={styles.chip}
                onPress={() => console.log('Pressed')}>
                Add
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
});

export default Create;
