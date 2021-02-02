import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Caption, TextInput, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import changeStyles from '../../../styles/auth/change';
import LightHeader from '../../layouts/LightHeader';

const inputs = [
  {label: 'Old password', key: 'old'},
  {label: 'New password', key: 'new'},
  {label: 'Repeat password', key: 'repeat'},
];

const styles = StyleSheet.create(changeStyles);

function Change() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    repeat: '',
  });

  function sendConfirmationLink() {
    setError('');
    setSuccess('');

    if (!passwords.old || !passwords.repeat || !passwords.new) {
      return setError('Input data can not be empty.');
    }

    if (passwords.old === passwords.new) {
      return setError('New password is the same as old.');
    }

    if (passwords.new !== passwords.repeat) {
      return setError('Passwords are not equal.');
    }

    const user = auth().currentUser;
    const credential = auth.EmailAuthProvider.credential(
      user.email,
      passwords.old,
    );

    user
      .reauthenticateWithCredential(credential)
      .then(() =>
        user
          .updatePassword(passwords.new)
          .then(() => setSuccess('Password was chagned.')),
      )
      .catch((err) => setError(err.message.replace(/\[.*\]\s/gi, '')));
  }

  return (
    <View style={styles.scroll}>
      <LightHeader title="Change password" />

      <View style={{...styles.page, ...styles.container}}>
        <Caption>You will get email with confirmation link.</Caption>
        {inputs.map(({label, key}, i) => (
          <TextInput
            key={i}
            style={{...styles.input}}
            label={label}
            secureTextEntry={true}
            value={passwords[key]}
            underlineColor="transparent"
            onChangeText={(text) => setPasswords((p) => ({...p, [key]: text}))}
          />
        ))}

        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
        {success.length > 0 && <Text style={styles.success}>{success}</Text>}

        <Button
          style={styles.btnBottom}
          mode="contained"
          onPress={() => sendConfirmationLink()}>
          Send confirmation link
        </Button>
      </View>
    </View>
  );
}

export default Change;
