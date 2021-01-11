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
import registerStyles from '../../styles/auth/register';
import {createUser} from '../../api/user';

const styles = StyleSheet.create(registerStyles);

function Register() {
  const history = useHistory();

  const [error, setError] = useState('');
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState('zaxovaiko@gmail.com');
  const [password, setPassword] = useState('password');

  function register() {
    if (check) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
          createUser(user)
            .then(() => history.push('/setup'))
            .catch((err) => console.log(err, 'Register create error'));
        })
        .catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            setError('That email address is already in use!');
          }
          if (err.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
          }

          if (err.code === 'auth/weak-password') {
            setError('Password is not strong enough!');
          }
        });
    } else {
      setError('You need to agree with terms and conditions.');
    }
  }

  return (
    <ScrollView contentContainerStyle={{...styles.page, ...styles.container}}>
      <View style={styles.flexContainer}>
        <Text style={{...styles.text, ...styles.color}}>lover</Text>

        <View>
          <Title style={styles.text}>Sign up</Title>
          {error.length > 0 && <Text style={styles.error}>{error}</Text>}
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
              onPress={() => setCheck((p) => !p)}
              color={'blue'}
            />
            <Text onPress={() => setCheck((p) => !p)}>
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

export default Register;
