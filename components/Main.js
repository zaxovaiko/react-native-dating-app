import React from 'react';
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

const icons = [
  {icon: faCog, link: '/settings'},
  {icon: faUserCircle, link: '/profile'},
  {icon: faMapMarkerAlt, link: '/nearby'},
  {icon: faHeart, link: '/liked'},
  {icon: faComments, link: '/chats'},
];

function Main() {
  const icons = [
    {icon: faCog, link: '/settings'},
    {icon: faUserCircle, link: '/profile'},
    {icon: faMapMarkerAlt, link: '/nearby'},
    {icon: faHeart, link: '/liked'},
    {icon: faComments, link: '/chats'},
  ];

  const controlIcons = [
    {icon: faHeartBroken, style: styles.dislikeBtn},
    {icon: frStar, style: styles.saveBtn},
    {icon: faHeart, style: styles.likeBtn},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {icons.map(({icon, link}, i) => {
          console.log(icon, link);
          return (
            <Link key={i} to={link} component={TouchableOpacity}>
              <FontAwesomeIcon
                icon={icon}
                size={26}
                style={styles.topBarIcon}
              />
            </Link>
          );
        })}
      </View>

      <View style={styles.mainImageBlock}>
        <Image
          source={{
            uri:
              'https://www.wallpaperup.com/uploads/wallpapers/2019/04/28/1321159/385b08992e91e605d2cb3d8b1aa0d8c4.jpg',
          }}
          style={styles.mainImage}
        />
        <View style={styles.userinfo}>
          <Headline style={styles.username}>Anna Tkach, 19</Headline>
          <Text style={styles.location}>Ukraine, Ivano-Frankivsk</Text>
        </View>
      </View>

      <View style={styles.bottomBar}>
        {controlIcons.map(({style, icon}, i) => (
          <View key={i} style={styles.icon}>
            <FontAwesomeIcon icon={icon} size={20} style={style} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topBarIcon: {
    color: '#8E44AD',
    zIndex: 2,
    marginHorizontal: 20,
  },
  mainImageBlock: {
    flex: 1,
    // padding: 15,
    borderRadius: 20,
  },
  mainImage: {
    zIndex: -1,
    width: '100%',
    aspectRatio: 3 / 4,
    resizeMode: 'contain',
  },
  userinfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .65)',
    padding: 10,
  },
  username: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
  },
  location: {
    color: '#fff',
    fontSize: 13,
  },
  icon: {
    backgroundColor: '#999',
    borderRadius: 200,
    padding: 20,
    marginHorizontal: 18,
  },
  bottomBar: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dislikeBtn: {
    color: 'red',
  },
  saveBtn: {
    color: 'yellow',
  },
  likeBtn: {
    color: 'red',
  },
});

export default Main;
