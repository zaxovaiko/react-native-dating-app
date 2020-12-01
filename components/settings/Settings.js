import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useHistory, Link} from 'react-router-native';
import {Appbar, Text} from 'react-native-paper';
import {
  scroll,
  page,
  container,
  input,
  SettText,
  SettIcon,
  FlexStyle,
} from '../../styles/index';

const styles = StyleSheet.create({
  scroll,
  container,
  page,
  input,
  SettText,
  SettIcon,
  FlexStyle,
});

function SettingsPage() {
  const history = useHistory();

  return (
    <View style={styles.scroll}>
      <Appbar.Header
        dark={false}
        style={{
          backgroundColor: '#fff',
          borderColor: 'transparent',
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        }}>
        <Appbar.BackAction onPress={() => history.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <View style={{...styles.container, ...styles.FlexStyle}}>
        <Image
          source={require('../iconPhoto/update-profil.png')}
          style={{...styles.SettIcon}}
        />
        <Link to="">
          <Text style={{...styles.SettText}}>Update profil info</Text>
        </Link>
      </View>

      <View style={{...styles.container, ...styles.FlexStyle}}>
        <Image
          source={require('../iconPhoto/change-passw.png')}
          style={{...styles.SettIcon}}
        />
        <Link to="/ChangePassword">
          <Text style={{...styles.SettText}}>Change password</Text>
        </Link>
      </View>

      <View style={{...styles.container, ...styles.FlexStyle}}>
        <Image
          source={require('../iconPhoto/lang.png')}
          style={{...styles.SettIcon}}
        />
        <Link to="">
          <Text style={{...styles.SettText}}>Language</Text>
        </Link>
      </View>

      <View style={{...styles.container, ...styles.FlexStyle}}>
        <Image
          source={require('../iconPhoto/create-room.png')}
          style={{...styles.SettIcon}}
        />
        <Link to="/room/create">
          <Text style={{...styles.SettText}}>Create a thematic room</Text>
        </Link>
      </View>

      <View style={{...styles.container, ...styles.FlexStyle}}>
        <Image
          source={require('../iconPhoto/join-to-room.png')}
          style={{...styles.SettIcon}}
        />
        <Link to="">
          <Text style={{...styles.SettText}}>Join to a thematic room</Text>
        </Link>
      </View>

      <View
        style={{...styles.container, marginTop: 'auto', ...styles.FlexStyle}}>
        <Image
          source={require('../iconPhoto/log-out.png')}
          style={{...styles.SettIcon}}
        />
        <Link to="">
          <Text style={{...styles.SettText}}>Log out</Text>
        </Link>
      </View>
    </View>
  );
}

export default SettingsPage;
