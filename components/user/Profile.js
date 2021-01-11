import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, Chip, Caption} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserEdit, faCommentDots} from '@fortawesome/free-solid-svg-icons';

import profileStyles from '../../styles/profile';
import {getUserById, isLikingUser} from '../../api/user';
import AppContext from '../../contexts/AppContext';
import LightHeader from '../layouts/LightHeader';
import {Link} from 'react-router-native';

const MAX_LENGTH = 60;

const styles = StyleSheet.create(profileStyles);

function Profile({match}) {
  const {user} = useContext(AppContext);

  const [init, setInit] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    let isMounted = true;

    getUserById(match.params.uid)
      .then((usr) => {
        isLikingUser(usr.uid, user.uid)
          .then((res) => {
            if (isMounted) {
              setProfile(usr);
              setIsLiking(res);
              setInit(true);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err, 'Profile useEffect error'));

    return () => {
      isMounted = false;
    };
  }, []);

  if (!init) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <LightHeader title="Profile" />

        <View>
          <Image source={{uri: profile.picture}} style={styles.mainImg} />
          <View style={styles.userinfo}>
            <View>
              <Text style={styles.username}>
                {profile.name}, {profile.age}
              </Text>
              <Text style={styles.location}>
                {profile.city}, {profile.country}
              </Text>
            </View>
            <View style={styles.userinfoIconsBlock}>
              {match.params.uid === user.uid && (
                <Link component={TouchableOpacity} to="/setup">
                  <FontAwesomeIcon
                    icon={faUserEdit}
                    size={30}
                    style={{...styles.userinfoIcons, ...styles.userEditIcon}}
                  />
                </Link>
              )}
              {isLiking && match.params.uid !== user.uid && (
                <FontAwesomeIcon
                  icon={faCommentDots}
                  size={30}
                  style={styles.userinfoIcons}
                />
              )}
            </View>
          </View>
        </View>

        <View style={styles.page}>
          {profile.status.length > 0 && (
            <View style={styles.mb}>
              <Text>
                {profile.status.length <= MAX_LENGTH && profile.status}
                {profile.status.length > MAX_LENGTH &&
                  !showStatus &&
                  profile.status.substr(0, MAX_LENGTH) + '...'}
                {profile.status.length > MAX_LENGTH &&
                  showStatus &&
                  profile.status}
              </Text>

              {profile.status.length > MAX_LENGTH && (
                <Caption onPress={() => setShowStatus((p) => !p)}>
                  {`Show ${!showStatus ? 'more' : 'less'}`}
                </Caption>
              )}
            </View>
          )}

          {profile.tags.length > 0 && (
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
          )}

          <View>
            <Text style={styles.sectionTitle}>Photos:</Text>
            <View style={styles.igImages}>
              {[...Array(4).keys()].map((_, i) => (
                <View style={styles.igImageWrapper} key={i}>
                  <Image
                    source={{uri: profile.picture}}
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
