import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {Link} from 'react-router-native';
import auth from '@react-native-firebase/auth';

function Home() {
  const user = auth().currentUser;

  function logout() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      });
  }

  return (
    <View>
      {!user && (
        <Link to="/login">
          <Text>Log in page</Text>
        </Link>
      )}
      <Link to="/room/create">
        <Text>Thematic room page</Text>
      </Link>
      <Link to="/setup">
        <Text>Set up profile</Text>
      </Link>
      {user && <Button onPress={() => logout()}>Log out</Button>}
    </View>
  );
}

export default Home;
