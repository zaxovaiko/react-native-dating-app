import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  Button,
  Caption,
  Checkbox,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Link, useHistory} from 'react-router-native';
import {
  fixedBtn,
  input,
  page,
  flexContainer,
  container,
  colors,
} from '../../styles/index';

function Register() {
  const history = useHistory();
  const [error, setError] = useState({error: false, msg: ''});
  const [email, setEmail] = useState('zaxovaiko@gmail.com');
  const [password, setPassword] = useState('password');
  const [check, setCheck] = useState(false);

  function register() {
    if (check) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          history.push('/setup');
        })
        .catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            setError({
              error: true,
              msg: 'That email address is already in use!',
            });
          }

          if (err.code === 'auth/invalid-email') {
            setError({
              error: true,
              msg: 'That email address is invalid!',
            });
          }

          console.error(error);
        });
    } else {
      setError({
        error: true,
        msg: 'You need to agree with terms and conditions.',
      });
    }
  }

  return (
    <ScrollView contentContainerStyle={{...styles.page, ...styles.container}}>
      <View style={styles.flexContainer}>
        <Text style={{...styles.text, ...styles.color}}>lover</Text>
        <View>
          <Title style={styles.text}>Sign up</Title>
          {error.error && <Text style={styles.error}>{error.msg}</Text>}
          <TextInput
            style={styles.input}
            label="Email"
            underlineColor="transparent"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            label="Password"
            underlineColor="transparent"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.checkbox}>
            <Checkbox
              status={check ? 'checked' : 'unchecked'}
              onPress={() => setCheck((prev) => !prev)}
              color={'blue'}
            />
            <Text onPress={() => setCheck((prev) => !prev)}>
              I agree with rights and terms
            </Text>
          </View>
        </View>
        <View>
          <Button
            style={styles.btn}
            mode="contained"
            onPress={() => register()}>
            Continue
          </Button>
          <Link component={TouchableOpacity} to="/login">
            <Caption style={styles.text}>I already have an account</Caption>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page,
  container,
  flexContainer,
  text: {
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  input,
  fixedBtn,
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: colors.primary,
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Register;
