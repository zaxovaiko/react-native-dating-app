import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {NativeRouter, Route, BackButton} from 'react-router-native';
import {Provider as PaperProvider} from 'react-native-paper';

// Auth
import Login from './components/auth/Login';
import Register from './components/auth/Login';
import PasswordRecover from './components/auth/PasswordRecover';

// Rest
import Home from './components/Home';
import Create from './components/room/Create';
import Setup from './components/user/Setup';

function App() {
  const ref = firestore().collection('todos');

  console.log(ref);

  return (
    <PaperProvider>
      <NativeRouter>
        <BackButton>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/password_recover" component={PasswordRecover} />
          <Route exact path="/room/create" component={Create} />
          <Route exact path="/setup" component={Setup} />
        </BackButton>
      </NativeRouter>
    </PaperProvider>
  );
}

export default App;
