import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useHistory} from 'react-router-native';
import {Appbar, Button, Caption, TextInput} from 'react-native-paper';
import {scroll, page, container, input} from '../../styles/index';

const styles = StyleSheet.create({
    scroll,
    container,
    page,
    input,
});

function ChangePassword() {
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
                <Appbar.Content title="Change password" />
            </Appbar.Header>

            <View style={{...styles.page, ...styles.container}}>
                <View>
                    <Caption>You will get email with confirmation link.</Caption>
                    <TextInput
                        style={{...styles.input}}
                        label="Old password"
                        secureTextEntry={true}
                        value={''}
                        underlineColor="transparent"
                        onChangeText={(text) => {}}
                    />
                    <TextInput
                        style={{...styles.input}}
                        label="New password"
                        secureTextEntry={true}
                        value={''}
                        underlineColor="transparent"
                        onChangeText={(text) => {}}
                    />
                    <TextInput
                        style={{...styles.input}}
                        label="Repeat new password"
                        secureTextEntry={true}
                        value={''}
                        underlineColor="transparent"
                        onChangeText={(text) => {}}
                    />
                </View>
                <Button
                    style={styles.btn}
                    mode="contained"
                    onPress={() => {
                        history.push('/login');
                    }}>
                    Send confirmation link
                </Button>
            </View>
        </View>
    );
}

export default ChangePassword;
