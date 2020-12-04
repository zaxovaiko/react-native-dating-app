import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text, Chip, Caption} from 'react-native-paper';
import LightHeader from '../layouts/LightHeader';

const MAX_LENGTH = 60;

function Profile() {
  const [status, setStatus] = useState({
    text:
      "I'm a frequent traveler, but not in the spontaneous sort of way. I love to plan my trips and go out on mini-adventures once I feel comfortable there. You can say I'm an organized free spirit. I love to try out new food, immerse myself in the beautiful culture of other places, and meet locals. I'm excited to meet you so we can plan our next adventure together!",
    show: false,
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <LightHeader title="Profile" />

        <View>
          <Image
            source={{
              uri:
                'https://i.pinimg.com/736x/3a/b8/71/3ab871d37cb3ef97c0f4989fde65e775.jpg',
            }}
            style={styles.mainImg}
          />
          <View style={styles.userinfo}>
            <Text style={styles.username}>Celestino Dare, 21</Text>
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
              {['sport', 'cooking', 'instagram'].map((e, i) => (
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
                <View style={styles.igImageWrapper}>
                  <Image
                    key={i}
                    source={{
                      uri:
                        'https://i.pinimg.com/736x/5e/54/92/5e54924df3159914a44d7535aafb344c.jpg',
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
    aspectRatio: 9 / 16,
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
