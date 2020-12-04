import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Caption, TextInput} from 'react-native-paper';
import LightHeader from '../../layouts/LightHeader';

const inputs = [
  {label: 'New password', key: 'new'},
  {label: 'Repeat password', key: 'repeat'},
];

function Recover() {
  const [passwords, setPasswords] = useState({
    new: '',
    repeat: '',
  });

  return (
    <View style={styles.page}>
      <LightHeader title="Password recover" />
      <View style={{...styles.container, ...styles.flexContainer}}>
        <Caption>You will get email with confirmation link.</Caption>
        {inputs.map(({label, key}, i) => (
          <TextInput
            key={i}
            style={styles.input}
            label={label}
            secureTextEntry={true}
            value={passwords[key]}
            underlineColor="transparent"
            onChangeText={(text) => setPasswords((p) => ({...p, [key]: text}))}
          />
        ))}
        <Button style={styles.btn} mode="contained" onPress={() => {}}>
          Send confirmation link
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  container: {
    padding: 15,
  },
  flexContainer: {
    flex: 1,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
    borderRadius: 5,
  },
  btn: {
    marginTop: 'auto',
  },
});

export default Recover;
