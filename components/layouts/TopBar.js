import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Link} from 'react-router-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCog,
  faUserCircle,
  faMapMarkerAlt,
  faHeart,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import {faGrinHearts} from '@fortawesome/free-regular-svg-icons';
import firestore from '@react-native-firebase/firestore';
import AppContext from '../../contexts/AppContext';
import mainStyles from '../../styles/main';

const styles = StyleSheet.create(mainStyles);

export default function TopBar({currentUser}) {
  const {user} = useContext(AppContext);

  const [likesCount, setLikesCount] = useState(0);
  const [newLikes, setNewLikes] = useState(false);

  const icons = [
    {icon: faCog, link: '/settings'},
    {icon: faUserCircle, link: `/profile/${user.uid}`},
    {icon: faMapMarkerAlt, link: '/nearby'},
    {
      icon: newLikes ? faGrinHearts : faHeart,
      link: '/liked',
      style: {color: 'red'},
    },
    {icon: faComments, link: '/chats'},
  ];

  useEffect(() => {
    let sub = () => {};

    (async () => {
      try {
        const docs = await firestore()
          .collection('users')
          .where('liked', 'array-contains', user.uid)
          .get();

        setLikesCount(docs.docs.length);

        sub = firestore()
          .collection('users')
          .where('liked', 'array-contains', user.uid)
          .onSnapshot((res) => {
            if (res.docs.length === 0) {
              //
            }

            if (res.docs.length > docs.docs.length) {
              setLikesCount(res.docs.length);
              setNewLikes(true);
            } else {
              setNewLikes(false);
            }
          });
      } catch (error) {
        console.log(error);
      }
    })();

    return () => sub();
  }, []);

  return (
    <View style={styles.topBar}>
      {icons.map(({icon, link, style}, i) => (
        <Link key={i} to={link} component={TouchableOpacity}>
          <FontAwesomeIcon
            icon={icon}
            size={26}
            style={
              newLikes ? {...styles.topBarIcon, ...style} : styles.topBarIcon
            }
          />
        </Link>
      ))}
    </View>
  );
}
