import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Caption, TextInput, Text} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import validator from 'validator';

import LightHeader from '../../layouts/LightHeader';
import recoverStyles from '../../../styles/auth/recover';

const styles = StyleSheet.create(recoverStyles);

function Recover() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function resetPassword() {
    setError('');
    setSuccess('');

    if (!validator.isEmail(email || '')) {
      return setError('Email is invalid');
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => setSuccess('Please, check your email'))
      .catch((err) => setError(err.message.replace(/\[.*\]\s/gi, '')));
  }

  return (
    <View style={styles.page}>
      <LightHeader title="Password recover" />

      <View style={{...styles.container, ...styles.flexContainer}}>
        <Caption>You will get email with confirmation link.</Caption>
        <TextInput
          style={styles.input}
          label={'Email'}
          value={email}
          underlineColor="transparent"
          onChangeText={(v) => setEmail(v)}
        />
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
        {success.length > 0 && <Text style={styles.success}>{success}</Text>}

        <Button
          style={styles.btn}
          mode="contained"
          onPress={() => resetPassword()}>
          Send confirmation link
        </Button>
      </View>
    </View>
  );
}

export default Recover;
