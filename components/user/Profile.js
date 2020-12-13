import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text, Chip, Caption} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import {getUserById} from '../../api/user';
import AppContext from '../../contexts/AppContext';
import LightHeader from '../layouts/LightHeader';

const MAX_LENGTH = 60;

function Profile() {
  const {user} = useContext(AppContext);

  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    tags: [],
    status,
  });
  const [status, setStatus] = useState({
    text: profile.status,
    show: false,
  });

  useEffect(() => {
    getUserById(user.uid)
      .then((usr) => {
        setProfile({
          name: usr.name,
          age:
            new Date().getFullYear() -
            new Date(
              new firestore.Timestamp(
                parseInt(usr.birth.seconds, 10),
                parseInt(usr.birth.nanoseconds, 10),
              ).toMillis(),
            ).getFullYear(),
          tags: usr.tags,
          picture: usr.picture,
        });
        setStatus({
          text: usr.status,
          show: false,
        });
        setShow(true);
      })
      .catch((err) => console.log(err, 'Profile useEffect error'));
  }, []);

  if (!show) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <LightHeader title="Profile" />

        <View>
          <Image
            source={{
              uri: profile.picture,
            }}
            style={styles.mainImg}
          />
          <View style={styles.userinfo}>
            <Text style={styles.username}>
              {profile.name}, {profile.age}
            </Text>
            <Text style={styles.location}>Ivano-Frankivsk, Ukraine</Text>
          </View>
        </View>

        <View style={styles.page}>
          <View style={styles.mb}>
            <Text>
              {status.text.substr(0, MAX_LENGTH) + (status.show ? '' : '...')}
              {status.text.length > MAX_LENGTH &&
                status.show &&
                status.text.substr(MAX_LENGTH, status.text.length)}
            </Text>
            {status.text.length > MAX_LENGTH && (
              <Caption
                onPress={() => setStatus((p) => ({...p, show: !p.show}))}>
                {`Show ${!status.show ? 'more' : 'less'}`}
              </Caption>
            )}
          </View>

          <View style={styles.mb}>
            <Text style={styles.sectionTitle}>Interests:</Text>
            <View style={styles.row}>
              {profile.tags.map((e, i) => (
                <Chip style={styles.mr} key={i} mode="outlined">
                  {e}
                </Chip>
              ))}
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Instagram photos:</Text>
            <View style={styles.igImages}>
              {[...Array(4).keys()].map((_, i) => (
                <View style={styles.igImageWrapper} key={i}>
                  <Image
                    key={i}
                    source={{
                      uri:
                        'https://www.wallpaperup.com/uploads/wallpapers/2019/04/28/1321159/385b08992e91e605d2cb3d8b1aa0d8c4.jpg',
                    }}
                    style={styles.igImage}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  mb: {
    marginBottom: 10,
  },
  mr: {
    marginRight: 5,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 5,
    color: '#777',
  },
  page: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  mainImg: {
    width: '100%',
    aspectRatio: 3 / 4,
    resizeMode: 'cover',
  },
  location: {
    fontSize: 13,
    color: '#fff',
  },
  userinfo: {
    position: 'absolute',
    bottom: 0,
    padding: 15,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .65)',
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  igImageWrapper: {
    width: '25%',
    paddingHorizontal: 5,
  },
  igImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  igImage: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default Profile;
