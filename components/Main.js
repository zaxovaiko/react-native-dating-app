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
    {icon: faHeartBroken, style: styles.dislikeBtn, onPress: dislikeUser},
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

  async function findAndSetNextValidUser(cu, next = null) {
    let possibleCurrentProfile = profile;
    try {
      while (true) {
        const res = await getUserFilteredByLocation(cu, next);

        possibleCurrentProfile = res.current.data();
        next = res.next;

        if (
          !next &&
          ((cu.liked && cu.liked.indexOf(possibleCurrentProfile.uid) !== -1) ||
            (cu.disliked &&
              cu.disliked.indexOf(possibleCurrentProfile.uid) !== -1))
        ) {
          setProfile(false);
          setNextUser(null);
          break;
        }

        if (
          possibleCurrentProfile.age >= cu.minAge &&
          ((!cu.liked && !cu.disliked) ||
            (cu.liked &&
              cu.liked.indexOf(possibleCurrentProfile.uid) === -1 &&
              !cu.disliked) ||
            (cu.disliked &&
              cu.disliked.indexOf(possibleCurrentProfile.uid) === -1 &&
              !cu.liked) ||
            (cu.liked.indexOf(possibleCurrentProfile.uid) === -1 &&
              cu.disliked.indexOf(possibleCurrentProfile.uid) === -1))
        ) {
          setProfile(possibleCurrentProfile);
          setNextUser(res.next);
          break;
        }
      }
    } catch (error) {
      console.log(error);
      setProfile(false);
      setNextUser(null);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const cu = await getUserById(user.uid);
        setCurrentUser(cu);
        await findAndSetNextValidUser(cu);
      } catch (err) {
        console.error(err);
      }
      setInit(false);
    })();
  }, []);

  async function updateByField(field) {
    try {
      const u = {...currentUser};

      console.log(u[field]);

      if (u[field]) {
        const idx = u[field].indexOf(profile.uid);
        if (idx === -1) {
          const of = field === 'liked' ? 'disliked' : 'liked';
          if (!u[of] || u[of].indexOf(profile.uid) === -1) {
            u[field].push(profile.uid);
          }
        }
      } else {
        u[field] = [profile.uid];
      }

      setCurrentUser(u);
      await updateUserById(u);
      await findAndSetNextValidUser(u, nextUser);
    } catch (error) {
      console.error(error);
    }
  }

  async function likeUser() {
    await updateByField('liked');
  }

  async function dislikeUser() {
    await updateByField('disliked');
  }

  async function saveUser() {
    try {
      const u = {...currentUser};
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

      await updateUserById(u);
      setCurrentUser(u);
    } catch (error) {
      console.error(error);
    }
  }

  async function tryAgain() {
    try {
      await findAndSetNextValidUser(currentUser);
    } catch (err) {
      console.warn(err);
      setProfile(false);
    }
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
