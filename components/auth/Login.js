import React, {useState} from 'react';
import {Text, Title, TextInput, Button, Caption} from 'react-native-paper';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Link, useHistory} from 'react-router-native';
import auth from '@react-native-firebase/auth';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('zaxovaiko@gmail.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState({error: false, msg: ''});

  function login() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push('/'))
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          setError({error: true, msg: 'User was not found.'});
        }

        if (err.code === 'auth/wrong-password') {
          setError({error: true, msg: 'Wrong password.'});
        }

        if (err.code === 'auth/invalid-email') {
          setError({error: true, msg: 'Invalid email.'});
        }
      });
  }

  return (
    <ScrollView contentContainerStyle={{...styles.container, ...styles.page}}>
      <View style={styles.flexContainer}>
        <Text style={{...styles.text, ...styles.color}}>lover</Text>

        <View>
          <Title style={styles.text}>Log in</Title>
          {error.error && <Text style={styles.error}>{error.msg}</Text>}

          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            underlineColor="transparent"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            label="Password"
            secureTextEntry={true}
            value={password}
            underlineColor="transparent"
            onChangeText={(text) => setPassword(text)}
          />

          <View style={styles.floatRight}>
            <Link component={TouchableOpacity} to="/password/recover">
              <Caption>Forgot password?</Caption>
            </Link>
          </View>
        </View>

        <View>
          <Button style={styles.btn} mode="contained" onPress={() => login()}>
            Log in
          </Button>
          <Link component={TouchableOpacity} to="/register">
            <Caption style={styles.text}>Sign up</Caption>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const colors = {
  primary: {color: '#6200ee'},
  white: {color: '#fff'},
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  flexContainer: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  container: {
    padding: 15,
  },
  input: {
    marginBottom: 10,
    borderRadius: 5,
  },
  btn: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  color: colors.primary,
  text: {
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  floatRight: {
    alignItems: 'flex-end',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Login;
