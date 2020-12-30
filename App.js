import React, {useState, useEffect} from 'react';
import {NativeRouter, Route, BackButton} from 'react-router-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

import {getUserById} from './api/user.api';
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
import Groups from './components/chats/Groups';
import MainChat from './components/chats/MainChats';
import GroupChats from './components/chats/GroupChats';
import Correspondence from './components/chats/Correspondence';

function App() {
  const [init, setInit] = useState(true);
  const [user, setUser] = useState();
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const sub = auth().onAuthStateChanged((usr) => {
      setUser(usr);

      if (usr) {
        getUserById(usr.uid)
          .then((doc) => setComplete(doc.complete))
          .catch((err) => console.error(err, 'App onAuthStateChange'));
      }

      if (init) {
        setInit(false);
      }
    });

    return sub;
  }, []);

  if (init) {
    return null;
  }

  return (
    <AppContext.Provider value={{user, complete, setUser, setComplete}}>
      <SafeAreaProvider>
        <PaperProvider>
          <NativeRouter>
            <BackButton>
              {user && complete && (
                <>
                  <Route exact path="/" component={Main} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/nearby" component={Nearby} />
                  <Route exact path="/setup" component={Setup} />
                  <Route exact path="/settings" component={Settings} />
                  <Route exact path="/password/change" component={PassChange} />
                  <Route exact path="/rooms" component={Groups} />
                  <Route exact path="/rooms/create" component={CreateRoom} />
                  <Route exact path="/chats" component={MainChat} />
                  <Route exact path="/chats/group" component={GroupChats} />
                  <Route
                    exact
                    path="/chats/unique"
                    component={Correspondence}
                  />
                  <Route exact path="/liked" component={Liked} />
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
    </AppContext.Provider>
  );
}

export default App;
