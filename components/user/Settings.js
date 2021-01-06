import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useHistory, Link} from 'react-router-native';
import {Text} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSignOutAlt,
  faUserEdit,
  faLockOpen,
  faUserPlus,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import auth from '@react-native-firebase/auth';

import settingsStyles from '../../styles/settings';
import LightHeader from '../layouts/LightHeader';

const links = [
  {link: '/setup', icon: faUserEdit, text: 'Update profile'},
  {link: '/password/change', icon: faLockOpen, text: 'Change password'},
  {link: '/saved', icon: faStar, text: 'Saved'},
  {link: '/room/create', icon: faUserEdit, text: 'Create a thematic room'},
  {link: '/room/join', icon: faUserPlus, text: 'Join a thematic room'},
];

const styles = StyleSheet.create(settingsStyles);

function SettingsPage() {
  const history = useHistory();

  function logout() {
    auth()
      .signOut()
      .then(() => history.push('/'));
  }

  return (
    <View style={styles.scroll}>
      <LightHeader title="Settings" />

      <View style={{...styles.container, ...styles.scroll}}>
        {links.map(({icon, link, text}, i) => (
          <Link to={link} key={i} component={TouchableOpacity}>
            <View style={styles.group}>
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

export default SettingsPage;
