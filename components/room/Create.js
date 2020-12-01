import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useHistory} from 'react-router-native';
import {Appbar, Button, Text, TextInput, Chip} from 'react-native-paper';
import {
  input,
  page,
  colors,
  flexContainer,
  container,
  fixedBtn,
  transparentHeader,
} from '../../styles/index';

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

function Create() {
  const history = useHistory();

  return (
    <View style={{...styles.page, ...styles.bg}}>
      <Appbar.Header dark={false} style={styles.transparentHeader}>
        <Appbar.BackAction onPress={() => history.goBack()} />
        <Appbar.Content title="New thematic room" />
      </Appbar.Header>

      <View style={{...styles.container, ...styles.flexContainer}}>
        <View>
          <TextInput
            style={styles.input}
            label="Room name"
            value={''}
            underlineColor="transparent"
            onChangeText={(text) => {}}
          />
          <TextInput
            style={styles.input}
            label="Room topic"
            value={''}
            underlineColor="transparent"
            onChangeText={(text) => {}}
          />
          <View>
            <Text style={{fontWeight: 'bold', marginBottom: 10}}>
              Interests
            </Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Chip
                mode="outlined"
                style={styles.chip}
                onPress={() => console.log('Pressed')}>
                sport
              </Chip>
              <Chip
                mode="outlined"
                style={styles.chip}
                onPress={() => console.log('Pressed')}>
                cooking
              </Chip>
              <Chip
                mode="outlined"
                style={styles.chip}
                onPress={() => console.log('Pressed')}>
                instagram
              </Chip>
              <Chip
                mode="outlined"
                style={styles.chip}
                onPress={() => console.log('Pressed')}>
                books
              </Chip>
              <Chip
                mode="outlined"
                style={styles.chip}
                onPress={() => console.log('Pressed')}>
                movies
              </Chip>
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

        <Button
          style={styles.fixedBtn}
          mode="contained"
          onPress={() => {
            history.push('/');
          }}>
          Create
        </Button>
      </View>
    </View>
  );
}

export default Create;
