import React from 'react';
import {View, Text} from 'react-native';
import {Link} from 'react-router-native';

function Home() {
    return (
        <View>
            <Link to="/login">
                <Text>Log in page</Text>
            </Link>
            <Link to="/room/create">
                <Text>Thematic room page</Text>
            </Link>
            <Link to="/userProf/UserProf">
                <Text>User Profil</Text>
            </Link>
        </View>
    );
}

export default Home;
