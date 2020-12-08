import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Caption, TextInput, Text} from 'react-native-paper';
import {scroll, page, container, input, btn} from '../../../styles/index';
import LightHeader from '../../layouts/LightHeader';

const inputs = [
  {label: 'Old password', key: 'old'},
  {label: 'New password', key: 'new'},
  {label: 'Repeat password', key: 'repeat'},
];

function Change() {
  const [error, setError] = useState('');
  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    repeat: '',
  });

  function sendConfirmationLink() {
    if (!passwords.old || !passwords.repeat || !passwords.new) {
      return setError('Input data can not be empty.');
    }

    if (passwords.old === passwords.new) {
      return setError('New password is the same as old.');
    }

    if (passwords.new !== passwords.repeat) {
      return setError('Passwords are not equal.');
    }

    // else send confirmation link
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
        <Text style={styles.error}>{error}</Text>
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

const styles = StyleSheet.create({
  scroll,
  container,
  page,
  input,
  btnBottom: {
    ...btn,
    marginTop: 'auto',
  },
  error: {
    color: 'red',
  },
});

export default Change;
