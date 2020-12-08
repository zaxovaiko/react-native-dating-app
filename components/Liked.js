import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import LightHeader from './layouts/LightHeader';

function Liked() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <LightHeader title="They like you" />

        <View style={styles.images}>
          {[...Array(20).keys()].map((e, i) => (
            <View key={i} style={styles.imageBlock}>
              <Image
                source={{
                  uri: 'https://via.placeholder.com/720x720',
                }}
                style={styles.image}
              />
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
});

export default Liked;
