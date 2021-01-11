import React, {useState, useEffect} from 'react';
import {NativeRouter, Route, BackButton} from 'react-router-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

import {getUserById} from './api/user';
import AppContext from './contexts/AppContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PassRecover from './components/auth/password/Recover';
import PassChange from './components/auth/password/Change';
import Settings from './components/user/Settings';
import Setup from './components/user/Setup';
import Main from './components/Main';
import Profile from './components/user/Profile';
import Nearby from './components/Nearby';
import Liked from './components/Liked';
import CreateRoom from './components/room/Create';
import Saved from './components/Saved';

function App() {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState();
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const sub = auth().onAuthStateChanged((usr) => {
      if (isMounted) {
        setUser(usr);

        if (usr) {
          getUserById(usr.uid)
            .then((doc) => setComplete(doc.complete))
            .catch((err) => console.error(err, 'App onAuthStateChange'));
        }

        setInit(false);
      }
    });

    return () => {
      isMounted = false;
      return sub();
    };
  }, []);

  if (init) {
    return null;
  }

  return (
    <AppContext.Provider value={{user, complete, setUser, setComplete}}>
<<<<<<< HEAD
      <PaperProvider>
        <NativeRouter>
          <BackButton>
            {user && !complete && (
              <>
                <Route exact path={['/', '/setup']} component={Setup} />
              </>
            )}
            {user && complete && (
              <>
                <Route exact path="/" component={Main} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/nearby" component={Nearby} />
                <Route exact path="/setup" component={Setup} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/password/change" component={PassChange} />
                <Route exact path="/chats/groups" component={Groups} />
                <Route exact path="/room/create" component={CreateRoom} />
                <Route exact path="/chats" component={MainChat} />
                <Route exact path="/chats/groupchats" component={GroupChats} />
                <Route exact path="/chats/correspondence" component={Correspondence} />
                <Route exact path="/liked" component={Liked} />
              </>
            )}
            {!user && (
              <>
                <Route exact path={['/', '/login']} component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/password/recover" component={PassRecover} />
              </>
            )}
          </BackButton>
        </NativeRouter>
      </PaperProvider>
=======
      <SafeAreaProvider>
        <PaperProvider>
          <NativeRouter>
            <BackButton>
              {user && complete && (
                <>
                  <Route exact path="/" component={Main} />
                  <Route exact path="/profile/:uid" component={Profile} />
                  <Route exact path="/nearby" component={Nearby} />
                  <Route exact path="/setup" component={Setup} />
                  <Route exact path="/settings" component={Settings} />
                  <Route exact path="/password/change" component={PassChange} />
                  <Route exact path="/rooms/create" component={CreateRoom} />
                  <Route exact path="/liked" component={Liked} />
                  <Route exact path="/saved" component={Saved} />
                </>
              )}
              {(!user || (user && !complete)) && (
                <>
                  <Route
                    exact
                    path={user && !complete ? '/login' : ['/', '/login']}
                    component={Login}
                  />
                  <Route
                    exact
                    path={user && !complete ? ['/', '/setup'] : '/setup'}
                    component={Setup}
                  />
                  <Route exact path="/register" component={Register} />
                  <Route
                    exact
                    path="/password/recover"
                    component={PassRecover}
                  />
                </>
              )}
            </BackButton>
          </NativeRouter>
        </PaperProvider>
      </SafeAreaProvider>
>>>>>>> 5ee82578b4f9ee5d6f118d1fe78bee5d9c558b82
    </AppContext.Provider>
  );
}

export default App;
