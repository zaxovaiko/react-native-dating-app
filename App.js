import React from 'react';
import {NativeRouter, Route} from 'react-router-native';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import PasswordRecover from './components/auth/PasswordRecover';
import Create from './components/room/Create';
import Create from './components/chats/CreateChats';
import Create from './components/chats/CreateGroupChats';

function App() {
    return (
        <NativeRouter>
            {/* isAuth ? Redirect to home : Login */}
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/password_recover" component={PasswordRecover} />
            <Route exact path="/room/create" component={Create} />
            <Route exact path="/room/create" component={CreateChats} />
            <Route exact path="/room/create" component={CreateGroupChats} />
        </NativeRouter>
    );
}

export default App;
