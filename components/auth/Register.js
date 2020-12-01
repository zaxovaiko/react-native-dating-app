import React, {useState} from 'react';
import {
  Button,
  Caption,
  Checkbox,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Link} from 'react-router-native';
import {
  fixedBtn,
  input,
  page,
  flexContainer,
  container,
  colors,
} from '../../styles/index';

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
});

function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [check, setCheck] = useState(false);

  return (
    <ScrollView contentContainerStyle={{...styles.page, ...styles.container}}>
      <View style={styles.flexContainer}>
        <Text style={{...styles.text, ...styles.color}}>lover</Text>
        <View>
          <Title style={styles.text}>Sign up</Title>
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
            value={pass}
            onChangeText={(text) => setPass(text)}
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
            onPress={() => console.log('Pressed')}>
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
