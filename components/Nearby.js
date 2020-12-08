import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import LightHeader from './layouts/LightHeader';

function Nearby() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <LightHeader title="People nearby" />

        <View style={styles.images}>
          {[...Array(10).keys()].map((e, i) => (
            <View key={i} style={styles.imageBlock}>
              <Image
                source={{
                  uri: 'https://via.placeholder.com/720x720',
                }}
                style={styles.image}
              />
              <Text style={styles.distance}>{i + 10} km</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  images: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  imageBlock: {
    width: '33.3%',
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 300,
  },
  distance: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default Nearby;
