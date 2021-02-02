import React, {useState} from 'react';
import {Text, Title, TextInput, Button, Caption} from 'react-native-paper';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Link, useHistory} from 'react-router-native';
import auth from '@react-native-firebase/auth';
import loginStyles from '../../styles/auth/login';

const styles = StyleSheet.create(loginStyles);

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function login() {
    if (email === '' || password === '') {
      return setError('Invalid data');
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push('/'))
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          setError('User was not found.');
        }

        if (err.code === 'auth/wrong-password') {
          setError('Wrong password.');
        }

        if (err.code === 'auth/invalid-email') {
          setError('Invalid email.');
        }
      });
  }

  return (
    <ScrollView contentContainerStyle={{...styles.container, ...styles.page}}>
      <View style={styles.flexContainer}>
        <Text testID="login-title" style={{...styles.text, ...styles.primary}}>
          lover
        </Text>

        <View>
          <Title testID="login-subtitle" style={styles.text}>
            Log in
          </Title>
          {error.length > 0 && (
            <Text testID="login-error" style={styles.error}>
              {error}
            </Text>
          )}

          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            underlineColor="transparent"
            testID="login-email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            label="Password"
            secureTextEntry={true}
            value={password}
            underlineColor="transparent"
            testID="login-password"
            onChangeText={(text) => setPassword(text)}
          />

          <View style={styles.floatRight}>
            <Link component={TouchableOpacity} to="/password/recover">
              <Caption testID="login-forgot">Forgot password?</Caption>
            </Link>
          </View>
        </View>

        <View>
          <Button
            testID="login-submit"
            style={styles.btn}
            mode="contained"
            onPress={() => login()}>
            Log in
          </Button>
          <Link component={TouchableOpacity} to="/register">
            <Caption testID="login-signup" style={styles.text}>
              Sign up
            </Caption>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

export default Login;
