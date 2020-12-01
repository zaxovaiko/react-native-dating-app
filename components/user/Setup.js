import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {useHistory} from 'react-router-native';
import {Appbar, Paragraph, Text, Chip, Button} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import {
  page,
  flexContainer,
  container,
  transparentHeader,
  fixedBtn,
} from '../../styles/index';

function Setup() {
  const [minAge, setMinAge] = useState(18);
  const history = useHistory();

  return (
    <ScrollView style={{...styles.page}}>
      <Appbar.Header dark={false} style={styles.transparentHeader}>
        <Appbar.BackAction onPress={() => history.goBack()} />
        <Appbar.Content title="Set up profile" />
      </Appbar.Header>

      <View
        style={{
          ...styles.container,
          ...styles.flexContainer,
          ...styles.fixes,
        }}>
        <View>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://via.placeholder.com/1000.jpg',
            }}
          />
        </View>

        {/* Birthday row */}
        <View style={styles.row}>
          <Paragraph style={styles.rowTitle}>Birthday</Paragraph>
          <Chip
            mode="outlined"
            style={styles.mr}
            onPress={() => console.log('Pressed')}>
            01.09.2000
          </Chip>
        </View>

        {/* Gender row */}
        <View style={styles.row}>
          <Paragraph style={styles.rowTitle}>Gender</Paragraph>
          <Chip
            mode="outlined"
            style={styles.mr}
            onPress={() => console.log('Pressed')}>
            Male
          </Chip>
        </View>

        {/* Interested in row */}
        <View style={styles.row}>
          <Paragraph style={styles.rowTitle}>Interested in</Paragraph>
          <Chip
            mode="outlined"
            style={styles.mr}
            onPress={() => console.log('Pressed')}>
            Women
          </Chip>
        </View>

        {/* Slider row */}
        <View>
          <View style={styles.row}>
            <Paragraph style={styles.rowTitle}>Age</Paragraph>
            <Text style={styles.mr}>{minAge}</Text>
          </View>
          <Slider
            style={{...styles.slider, ...styles.row}}
            minimumValue={18}
            maximumValue={60}
            thumbTintColor="#6200ee"
            minimumTrackTintColor="#6200ee"
            maximumTrackTintColor="#6200ee"
            step={1}
            value={18}
            onValueChange={(e) => {
              setMinAge(e);
            }}
          />
        </View>

        {/* Tags row */}
        <View>
          <Paragraph style={{...styles.rowTitle, ...styles.chips}}>
            Tags
          </Paragraph>
          <View style={styles.row}>
            <Chip
              mode="outlined"
              style={styles.chips}
              onPress={() => console.log('Pressed')}>
              sport
            </Chip>
            <Chip
              mode="outlined"
              style={styles.chips}
              onPress={() => console.log('Pressed')}>
              cooking
            </Chip>
            <Chip
              mode="outlined"
              style={styles.chips}
              onPress={() => console.log('Pressed')}>
              movies
            </Chip>
            <Chip
              mode="outlined"
              style={styles.chips}
              onPress={() => console.log('Pressed')}>
              +
            </Chip>
          </View>
        </View>

        <Button
          style={styles.fixedBtn}
          mode="contained"
          onPress={() => {
            history.push('/');
          }}>
          Save profile
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page,
  flexContainer,
  container,
  transparentHeader,
  fixedBtn,
  fixes: {
    justifyContent: 'flex-start',
  },
  row: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTitle: {
    fontWeight: '700',
    color: '#000',
  },
  mr: {
    marginLeft: 'auto',
  },
  chips: {
    marginBottom: 10,
    marginRight: 5,
  },
  slider: {
    height: 10,
    marginLeft: -15,
    marginRight: -15,
  },
  avatar: {
    width: 250,
    height: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
    borderRadius: 500,
  },
});

// TODO: Add modal window for chip choosing (interests)
export default Setup;
