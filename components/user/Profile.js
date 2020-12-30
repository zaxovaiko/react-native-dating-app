import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text, Chip, Caption} from 'react-native-paper';

import profileStyles from '../../styles/profile';
import {getUserById} from '../../api/user.api';
import AppContext from '../../contexts/AppContext';
import LightHeader from '../layouts/LightHeader';

const MAX_LENGTH = 60;

const styles = StyleSheet.create(profileStyles);

function Profile() {
  const {user} = useContext(AppContext);

  const [init, setInit] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    age: 0,
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
        setProfile(usr);
        setStatus({
          text: usr.status,
          show: false,
        });
        setInit(false);
      })
      .catch((err) => console.log(err, 'Profile useEffect error'));
  }, []);

  if (init) {
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
            <Text style={styles.location}>
              {profile.location.latitude} {profile.location.longitude}
            </Text>
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

export default Profile;
