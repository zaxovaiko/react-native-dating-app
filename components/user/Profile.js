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
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {
  faUserEdit,
  faCommentDots,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';

import profileStyles from '../../styles/profile';
import {getUserById, isLikingUser, updateUserById} from '../../api/user';
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
  const [previewImgs, setPreviewImgs] = useState({});

  useEffect(() => {
    let isMounted = true;

    getUserById(match.params.uid)
      .then((usr) => {
        setPreviewImgs(usr.images || {});

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

  function uploadImage(key) {
    ImagePicker.openPicker({
      width: 1080,
      height: 1920,
      cropping: true,
    })
      .then(async (image) => {
        setPreviewImgs((p) => ({...p, [key]: image.path}));

        try {
          const ext = image.path.split('.').pop();
          const path = `user_uploads/${user.uid}.${key}.${ext}`;

          // save to db
          const ref = storage().ref(path);
          await ref.putFile(image.path);

          // get url and update user
          const url = await storage().ref(path).getDownloadURL();

          await updateUserById({
            ...profile,
            images: {...previewImgs, [key]: url},
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => console.log(err));
  }

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
                <Link component={TouchableOpacity} to={`/chats/${profile.uid}`}>
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    size={30}
                    style={styles.userinfoIcons}
                  />
                </Link>
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

          {(Object.keys(previewImgs).length !== 0 ||
            user.uid === profile.uid) && (
            <View>
              <Text style={styles.sectionTitle}>Photos:</Text>
              <View style={styles.igImages}>
                {[...Array(4).keys()].map((_, i) => (
                  <View style={styles.igImageWrapper} key={i}>
                    <TouchableOpacity
                      onPress={() => {
                        if (user.uid === profile.uid) {
                          uploadImage(i);
                        } else {
                          //
                        }
                      }}>
                      {previewImgs[i] && (
                        <Image
                          source={{uri: previewImgs[i]}}
                          style={styles.igImage}
                        />
                      )}
                      {user.uid === profile.uid && !previewImgs[i] && (
                        <FontAwesomeIcon
                          icon={faUpload}
                          size={22}
                          style={styles.uploadIcon}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;
