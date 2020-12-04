import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
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

const icons = [
  {icon: faCog, link: '/settings'},
  {icon: faUserCircle, link: '/profile'},
  {icon: faMapMarkerAlt, link: '/nearby'},
  {icon: faHeart, link: '/interested'},
  {icon: faComments, link: '/chats'},
];

function Main() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {icons.map(({icon, link}, i) => {
          console.log(icon, link);
          return (
            <Link key={i} to={link}>
              <FontAwesomeIcon
                icon={icon}
                size={26}
                style={styles.topBarIcon}
              />
            </Link>
          );
        })}
      </View>
      <View>
        <Image
          source={{
            uri: 'https://wallpaperaccess.com/full/1555545.jpg',
          }}
          style={styles.mainImage}
        />
        <View style={styles.userinfo}>
          <Headline style={styles.username}>Anna Tkach, 19</Headline>
          <Text style={styles.location}>Ukraine, Ivano-Frankivsk</Text>
        </View>
      </View>
      <View style={styles.bottomBar}>
        <FontAwesomeIcon
          icon={faHeartBroken}
          size={50}
          style={styles.dislikeBtn}
        />
        <FontAwesomeIcon icon={frStar} size={50} style={styles.saveBtn} />
        <FontAwesomeIcon icon={faHeart} size={50} style={styles.likeBtn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topBarIcon: {
    color: '#fff',
    marginHorizontal: 20,
  },
  mainImage: {
    top: -66,
    zIndex: -1,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  userinfo: {
    position: 'absolute',
    bottom: 175,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  username: {
    fontWeight: '700',
    color: '#fff',
  },
  location: {
    color: '#fff',
  },
  bottomBar: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 'auto',
    bottom: 25,
    justifyContent: 'center',
    left: 0,
    right: 0,
  },
  dislikeBtn: {
    color: 'red',
  },
  saveBtn: {
    marginHorizontal: 60,
    color: 'yellow',
  },
  likeBtn: {
    color: 'red',
  },
});

export default Main;
