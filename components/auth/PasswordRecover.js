import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useHistory} from 'react-router-native';
import {Appbar, Button, Caption, TextInput} from 'react-native-paper';

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'space-between',
    },
    page: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',
    },
    input: {
        marginBottom: 10,
        borderRadius: 5,
    },
});

function PasswordRecover() {
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
                <Appbar.Content title="Password recover" />
            </Appbar.Header>

            <View style={{...styles.page, ...styles.container}}>
                <View>
                    <Caption>You will get email with confirmation link.</Caption>
                    <TextInput
                        style={styles.input}
                        label="Old password"
                        secureTextEntry={true}
                        value={''}
                        underlineColor="transparent"
                        onChangeText={(text) => {}}
                    />
                    <TextInput
                        style={styles.input}
                        label="New password"
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

export default PasswordRecover;
