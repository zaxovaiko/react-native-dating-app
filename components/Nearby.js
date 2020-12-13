import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import GetLocation from 'react-native-get-location';

import LightHeader from './layouts/LightHeader';
import {getNearbyUsers} from '../api/location';
import AppContext from '../contexts/AppContext';

function Nearby() {
  const {user} = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let isMounted = true;

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((loc) => {
        if (isMounted) {
          getNearbyUsers(loc)
            .then((res) => {
              setUsers(res.filter((e) => e.email !== user.email));
              setShow(true);
            })
            .catch((err) => console.log(err, 'Nearby useEffect error'));
        }
      })
      .catch((err) => {
        const {code, message} = err;
        console.warn(code, message);
        console.log('Setup useEffect error');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <LightHeader title="People nearby" />

        <View style={styles.images}>
          {users.map((usr, i) => (
            <View key={i} style={styles.imageBlock}>
              <Image
                source={{
                  uri: usr.picture,
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
