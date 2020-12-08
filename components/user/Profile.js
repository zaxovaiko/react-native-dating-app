import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text, Chip, Caption} from 'react-native-paper';
import LightHeader from '../layouts/LightHeader';
import firestore from '@react-native-firebase/firestore';
import AppContext from '../../contexts/AppContext';

const MAX_LENGTH = 60;

function Profile() {
  const {user} = useContext(AppContext);

  const [show, setShow] = useState(false);
  const [userinfo, setUserinfo] = useState({});
  const [status, setStatus] = useState({
    text:
      "I'm a frequent traveler, but not in the spontaneous sort of way. I love to plan my trips and go out on mini-adventures once I feel comfortable there. You can say I'm an organized free spirit. I love to try out new food, immerse myself in the beautiful culture of other places, and meet locals. I'm excited to meet you so we can plan our next adventure together!",
    show: false,
  });

  useEffect(() => {
    firestore()
      .collection('users')
      .where('uid', '==', user.uid)
      .get()
      .then((doc) => {
        setUserinfo(doc.docs[0].data());
        setShow(true);
      })
      .catch((err) => console.log(err));
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
              uri:
                'https://www.wallpaperup.com/uploads/wallpapers/2019/04/28/1321159/385b08992e91e605d2cb3d8b1aa0d8c4.jpg',
            }}
            style={styles.mainImg}
          />
          <View style={styles.userinfo}>
            <Text style={styles.username}>{userinfo.email}, 21</Text>
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
              {userinfo.tags.map((e, i) => (
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
