import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import GetLocation from 'react-native-get-location';
import distance from 'gps-distance';

import nearbyStyles from '../styles/nearby';
import LightHeader from './layouts/LightHeader';
import {getNearbyUsers} from '../api/location';
import AppContext from '../contexts/AppContext';

const styles = StyleSheet.create(nearbyStyles);

function Nearby() {
  const {user} = useContext(AppContext);
  const [location, setLocation] = useState({});
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
          setLocation(loc);
          getNearbyUsers(loc)
            .then((res) => {
              setUsers(res.filter((e) => e.email !== user.email));
            })
            .catch((err) => console.log(err, 'Nearby useEffect error'))
            .then(() => setShow(true));
        }
      })
      .catch((err) => {
        console.warn(err);
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
              <Image source={{uri: usr.picture}} style={styles.image} />
              <Text style={styles.distance}>
                {distance(
                  location.latitude,
                  location.longitude,
                  usr.location.latitude,
                  usr.location.longitude,
                ).toFixed(2)}{' '}
                km
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Nearby;
