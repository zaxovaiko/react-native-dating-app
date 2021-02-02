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
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Link, useHistory} from 'react-router-native';
import registerStyles from '../../styles/auth/register';
import {createUser} from '../../api/user';

const styles = StyleSheet.create(registerStyles);

function Register() {
  const history = useHistory();

  const [error, setError] = useState('');
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function register() {
    if (check) {
      if (email === '' || password === '') {
        return setError('Invalid data');
      }

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

  const showTerms = () =>
    Alert.alert(
      'Our right and terms',
      `Copyright 2021 Lover

      Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      
      The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      `,
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );

  return (
    <ScrollView contentContainerStyle={{...styles.page, ...styles.container}}>
      <View style={styles.flexContainer}>
        <Text testID="register-title" style={{...styles.text, ...styles.color}}>
          lover
        </Text>

        <View>
          <Title testID="register-subtitle" style={styles.text}>
            Sign up
          </Title>
          {error.length > 0 && (
            <Text testID="register-error" style={styles.error}>
              {error}
            </Text>
          )}
          <TextInput
            testID="register-email"
            style={styles.input}
            label="Email"
            underlineColor="transparent"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            testID="register-pass"
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
            <Text
              testID="register-terms"
              onPress={() => {
                setCheck((p) => !p);
                return showTerms();
              }}>
              I agree with rights and terms
            </Text>
          </View>
        </View>

        <View>
          <Button
            testID="register-submit"
            style={styles.btn}
            mode="contained"
            onPress={() => register()}>
            Continue
          </Button>
          <Link component={TouchableOpacity} to="/login">
            <Caption testID="register-login-link" style={styles.text}>
              I already have an account
            </Caption>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

export default Register;
