import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text, Headline, Button} from 'react-native-paper';
import {Link} from 'react-router-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCog,
  faStar,
  faUserCircle,
  faMapMarkerAlt,
  faHeart,
  faComments,
  faHeartBroken,
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons';
import {faStar as frStar} from '@fortawesome/free-regular-svg-icons';

import mainStyles from '../styles/main';
import {
  getUserFilteredByLocation,
  getUserById,
  updateUserById,
} from '../api/user';
import AppContext from '../contexts/AppContext';

const styles = StyleSheet.create(mainStyles);

function Main() {
  const {user} = useContext(AppContext);

  const icons = [
    {icon: faCog, link: '/settings'},
    {icon: faUserCircle, link: `/profile/${user.uid}`},
    {icon: faMapMarkerAlt, link: '/nearby'},
    {icon: faHeart, link: '/liked'},
    {icon: faComments, link: '/chats'},
  ];

  const [init, setInit] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [profile, setProfile] = useState(false);
  const [nextUser, setNextUser] = useState();

  const controlIcons = [
    {icon: faHeartBroken, style: styles.dislikeBtn, onPress: likeUser},
    {
      icon:
        profile &&
        currentUser &&
        currentUser.saved &&
        currentUser.saved.indexOf(profile.uid) !== -1
          ? faStar
          : frStar,
      style: styles.saveBtn,
      onPress: saveUser,
    },
    {icon: faHeart, style: styles.likeBtn, onPress: likeUser},
  ];

  useEffect(() => {
    let isMounted = true;

    getUserById(user.uid)
      .then((cu) => {
        if (isMounted) {
          setCurrentUser(cu);
        }

        getUserFilteredByLocation(cu)
          .then((res) => {
            if (isMounted) {
              setProfile(res.current.data());
              setNextUser(res.next);
              setInit(false);
            }
          })
          .catch((err) => {
            console.warn(err);
            if (isMounted) {
              setProfile(false);
              setInit(false);
            }
          });
      })
      .catch((err) => console.warn(err));

    return () => {
      isMounted = false;
    };
  }, []);

  function likeUser() {
    if (!init && nextUser) {
      return getUserFilteredByLocation(currentUser, nextUser).then((res) => {
        setProfile(res.current.data());
        setNextUser(res.next);
      });
    }
    setProfile(false);
  }

  function saveUser() {
    getUserById(user.uid)
      .then((u) => {
        if (u.saved) {
          const idx = u.saved.indexOf(profile.uid);
          if (idx !== -1) {
            u.saved.splice(idx, 1);
          } else {
            u.saved.push(profile.uid);
          }
        } else {
          u.saved = [profile.uid];
        }

        updateUserById(u)
          .then(() => setCurrentUser(u))
          .catch((err) => console.log(err, 'error occured'));
      })
      .catch((err) => console.error(err));
  }

  function tryAgain() {
    getUserFilteredByLocation(currentUser)
      .then((res) => {
        setProfile(res.current.data());
        setNextUser(res.next);
      })
      .catch((err) => {
        console.warn(err);
        setProfile(false);
      });
  }

  if (init) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {icons.map(({icon, link}, i) => (
          <Link key={i} to={link} component={TouchableOpacity}>
            <FontAwesomeIcon icon={icon} size={26} style={styles.topBarIcon} />
          </Link>
        ))}
      </View>

      {!profile && (
        <View style={styles.notFoundView}>
          <FontAwesomeIcon
            style={styles.notFoundIcon}
            size={150}
            icon={faUserTimes}
          />
          <Text style={styles.notFound}>There is no one to show</Text>
          <Button onPress={() => tryAgain()} style={styles.notFoundButton}>
            Try again
          </Button>
        </View>
      )}

      {profile && (
        <>
          <View style={styles.mainImageBlock}>
            <Image source={{uri: profile.picture}} style={styles.mainImage} />

            <View style={styles.userinfo}>
              <Link component={TouchableOpacity} to={`/profile/${profile.uid}`}>
                <Headline style={styles.username}>
                  {profile.name}, {profile.age}
                </Headline>
              </Link>
              <Text style={styles.location}>
                {profile.city}, {profile.country}
              </Text>
            </View>
          </View>

          <View style={styles.bottomBar}>
            {controlIcons.map(({style, icon, onPress}, i) => (
              <TouchableOpacity key={i} style={styles.icon} onPress={onPress}>
                <FontAwesomeIcon icon={icon} size={20} style={style} />
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

export default Main;
