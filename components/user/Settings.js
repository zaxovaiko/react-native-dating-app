import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useHistory, Link} from 'react-router-native';
import {Text} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSignOutAlt,
  faUserEdit,
  faLockOpen,
  faGlobe,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import auth from '@react-native-firebase/auth';
import LightHeader from '../layouts/LightHeader';

const links = [
  {link: '/setup', icon: faUserEdit, text: 'Update profile'},
  {link: '/password/change', icon: faLockOpen, text: 'Change password'},
  {link: '/lang', icon: faGlobe, text: 'Language'},
  {link: '/room/create', icon: faUserEdit, text: 'Create a thematic room'},
  {link: '/room/join', icon: faUserPlus, text: 'Join a thematic room'},
];

function SettingsPage() {
  const history = useHistory();

  function logout() {
    auth()
      .signOut()
      .then(() => {
        history.push('/');
      });
  }

  return (
    <View style={styles.scroll}>
      <LightHeader title="Settings" />

      <View style={{...styles.container, ...styles.scroll}}>
        {links.map(({icon, link, text}, i) => (
          <Link to={link} key={i} component={TouchableOpacity}>
            <View style={{...styles.group}}>
              <FontAwesomeIcon style={styles.icon} size={14} icon={icon} />
              <Text style={styles.groupText}>{text}</Text>
            </View>
          </Link>
        ))}

        <TouchableOpacity
          style={{
            ...styles.group,
            ...styles.bottomGroup,
          }}
          onPress={() => logout()}>
          <FontAwesomeIcon style={styles.icon} size={14} icon={faSignOutAlt} />
          <Text style={styles.groupText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 15,
  },
  page: {
    flex: 1,
    flexDirection: 'column',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomGroup: {
    marginTop: 'auto',
    marginBottom: 0,
  },
  groupText: {
    padding: 15,
  },
  icon: {
    color: '#262626',
    padding: 15,
  },
});

export default SettingsPage;
