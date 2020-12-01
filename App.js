import React, {useState, useEffect} from 'react';
import {NativeRouter, Route, BackButton} from 'react-router-native';
import {Provider as PaperProvider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PasswordRecover from './components/auth/PasswordRecover';

import Home from './components/Home';
import Create from './components/room/Create';
import Setup from './components/user/Setup';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    console.log(auth().currentUser);
  });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <PaperProvider>
      <NativeRouter>
        <BackButton>
          <Route exact path="/" component={Home} />
          {user && (
            <>
              <Route exact path="/room/create" component={Create} />
              <Route exact path="/setup" component={Setup} />
            </>
          )}
          {!user && (
            <>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/password_recover"
                component={PasswordRecover}
              />
            </>
          )}
        </BackButton>
      </NativeRouter>
    </PaperProvider>
  );
}

export default App;
