import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useHistory, Link} from 'react-router-native';
import {Appbar, Text, Image} from 'react-native-paper';
import {scroll, page, container, input} from '../../styles/index';

const styles = StyleSheet.create({
    scroll,
    container,
    page,
    input,
});

function SettingsPage() {
    const history = useHistory();

    return (
        <View style={styles.scroll}>
            <Appbar.Header
                dark={false}
                style={{
                    backgroundColor: '#fff',
                    borderColor: 'transparent',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                }}>
                <Appbar.BackAction onPress={() => history.goBack()} />
                <Appbar.Content title="Settings" />
            </Appbar.Header>

            <View style={{...styles.container}}>
                <Link to="">
                    <Text>Update profil info</Text>
                </Link>
            </View>

            <View style={{...styles.container}}>
                <Link to="/ChangePassword">
                    <Text>Change password</Text>
                </Link>
            </View>

            <View style={{...styles.container}}>
                <Link to="">
                    <Text>Language</Text>
                </Link>
            </View>

            <View style={{...styles.container}}>
                <Link to="/room/create">
                    <Text>Create a thematic room</Text>
                </Link>
            </View>

            <View style={{...styles.container}}>
                <Link to="">
                    <Text>Join to a thematic room</Text>
                </Link>
            </View>

            <View style={{...styles.container, top: 300}}>
                <Link to="">
                    <Text>Log out</Text>
                </Link>
            </View>
        </View>
    );
}

export default SettingsPage;
