import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import {Link} from 'react-router-native';
import {getSaved} from '../api/user';
import AppContext from '../contexts/AppContext';
import LightHeader from './layouts/LightHeader';

function Saved() {
  const {user} = useContext(AppContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getSaved(user.uid)
      .then((res) => setUsers(res))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <LightHeader title="Saved" />

        <View style={styles.images}>
          {users.map((usr) => (
            <View key={usr.uid} style={styles.imageBlock}>
              <Link component={TouchableOpacity} to={`/profile/${usr.uid}`}>
                <>
                  <Image source={{uri: usr.picture}} style={styles.image} />
                  <Text style={styles.distance}>{usr.name.substr(0, 10)}</Text>
                </>
              </Link>
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
  distance: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
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

export default Saved;
