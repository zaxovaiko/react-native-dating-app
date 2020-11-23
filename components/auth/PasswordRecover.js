import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useHistory} from 'react-router-native';
import {Appbar, Button, Caption, TextInput} from 'react-native-paper';
import {
  input,
  page,
  flexContainer,
  container,
  transparentHeader,
} from '../../styles/index';

const styles = StyleSheet.create({
  page,
  container,
  flexContainer,
  input,
  transparentHeader,
});

function PasswordRecover() {
  const history = useHistory();

  return (
    <View style={styles.page}>
      <Appbar.Header dark={false} style={styles.transparentHeader}>
        <Appbar.BackAction onPress={() => history.goBack()} />
        <Appbar.Content title="Password recover" />
      </Appbar.Header>

      <View style={{...styles.container, ...styles.flexContainer}}>
        <View>
          <Caption>You will get email with confirmation link.</Caption>
          <TextInput
            style={styles.input}
            label="Old password"
            secureTextEntry={true}
            value={''}
            underlineColor="transparent"
            onChangeText={(text) => {}}
          />
          <TextInput
            style={styles.input}
            label="New password"
            secureTextEntry={true}
            value={''}
            underlineColor="transparent"
            onChangeText={(text) => {}}
          />
        </View>
        <Button
          style={styles.btn}
          mode="contained"
          onPress={() => {
            history.push('/login');
          }}>
          Send confirmation link
        </Button>
      </View>
    </View>
  );
}

export default PasswordRecover;
