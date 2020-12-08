import React from 'react';
import {NativeRouter, Route} from 'react-router-native';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import PasswordRecover from './components/auth/PasswordRecover';
import Create from './components/room/Create';
import Chats from './components/chats/MainChats';
import CreateGroupChats from './components/chats/GroupChats';
import Correspondence from './components/chats/Correspondence';

function App() {
    return (
        <NativeRouter>
            {/* isAuth ? Redirect to home : Login */}
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <Route exact path="/password_recover" component={PasswordRecover} />
            <Route exact path="/room/create" component={Create} />
            <Route exact path="/chats/mainchats" component={Chats} />
            <Route exact path="/chats/groupchats" component={CreateGroupChats} />
            <Route exact path="/chats/correspondence" component={Correspondence} />
        </NativeRouter>
    );
}

export default App;
