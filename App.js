import React from 'react';
import {NativeRouter, Route, Switch} from 'react-router-native';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import PasswordRecover from './components/auth/PasswordRecover';
import Create from './components/room/Create';
import Profil from './components/userProf/UserProf';
import SettingsPage from './components/settings/Settings';
import ChangePassword from './components/auth/ChangePassword';
import PeopleNearby from './components/People-nearby/PeopleNearby';

function App() {
    return (
        <NativeRouter>
            {/* isAuth ? Redirect to home : Login */}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Register} />
                <Route exact path="/password_recover" component={PasswordRecover} />
                <Route exact path="/ChangePassword" component={ChangePassword} />
                <Route exact path="/room/create" component={Create} />
                <Route exact path="/userProf/UserProf" component={Profil} />
                <Route exact path="/settings/Settings" component={SettingsPage} />
                <Route exact path="/People-nearby/PeopleNearby" component={PeopleNearby} />
            </Switch>
        </NativeRouter>
    );
}

export default App;
