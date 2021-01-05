import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text, Headline} from 'react-native-paper';
import {Link} from 'react-router-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCog,
  faUserCircle,
  faMapMarkerAlt,
  faHeart,
  faComments,
  faHeartBroken,
} from '@fortawesome/free-solid-svg-icons';
import {faStar as frStar} from '@fortawesome/free-regular-svg-icons';

import mainStyles from '../styles/main';
import {getUserFilteredByLocation, getUserById} from '../api/user';
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
  const [profile, setProfile] = useState();
  const [nextUser, setNextUser] = useState();

  const controlIcons = [
    {icon: faHeartBroken, style: styles.dislikeBtn, onPress: likeUser},
    {icon: frStar, style: styles.saveBtn, onPress: likeUser},
    {icon: faHeart, style: styles.likeBtn, onPress: likeUser},
  ];

  useEffect(() => {
    let isMounted = true;

    getUserById(user.uid)
      .then((cu) => {
        if (isMounted) {
          setCurrentUser(cu);
        }

        getUserFilteredByLocation(cu).then((res) => {
          if (isMounted) {
            setProfile(res.current.data());
            setNextUser(res.next);
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
    getUserFilteredByLocation(currentUser, nextUser).then((res) => {
      setProfile(res.current.data());
      setNextUser(res.next);
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
      {!profile && <Text>User was not found</Text>}
      {profile && (
        <>
          <View style={styles.mainImageBlock}>
            <Image source={{uri: profile.picture}} style={styles.mainImage} />
            <View style={styles.userinfo}>
              <Headline style={styles.username}>
                {profile.name}, {profile.age}
              </Headline>
              <Text style={styles.location}>
                {profile.location.latitude} {profile.location.longitude}
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
