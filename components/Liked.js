import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-native';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeartBroken} from '@fortawesome/free-solid-svg-icons';
import LightHeader from './layouts/LightHeader';
import {getLiked} from '../api/user';
import AppContext from '../contexts/AppContext';
import likedStyles from '../styles/liked';

const styles = StyleSheet.create(likedStyles);

function Liked() {
  const {user} = useContext(AppContext);

  const [init, setInit] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getLiked(user.uid)
      .then((res) => setUsers(res))
      .catch((err) => console.error(err))
      .finally(() => setInit(true));
  }, []);

  if (!init) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LightHeader title="They like you" />

        {users.length === 0 && (
          <View style={styles.notFoundView}>
            <FontAwesomeIcon
              style={styles.icon}
              size={150}
              icon={faHeartBroken}
            />
            <Text style={styles.notFound}>No one likes you :(</Text>
          </View>
        )}

        {users.length > 0 && (
          <View style={styles.images}>
            {users.map((e, i) => (
              <View style={styles.imageBlock} key={i}>
                <Link to={`/profile/${e.uid}`} component={TouchableOpacity}>
                  <Image source={{uri: e.picture}} style={styles.image} />
                </Link>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default Liked;
