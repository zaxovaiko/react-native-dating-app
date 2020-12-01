import React, {useState} from 'react';
import {Text, Title, TextInput, Button, Caption} from 'react-native-paper';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Link} from 'react-router-native';

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
    text: {
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
    input: {
        marginBottom: 10,
        borderRadius: 5,
    },
    btn: {
        width: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <ScrollView contentContainerStyle={{...styles.page, ...styles.scroll}}>
            <View style={styles.container}>
                <Text style={{...styles.text, color: '#6200EE'}}>lover</Text>
                <View>
                    <Title style={styles.text}>Log in</Title>
                    <TextInput
                        style={styles.input}
                        label="Email"
                        value={email}
                        underlineColor="transparent"
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        label="Password"
                        secureTextEntry={true}
                        value={pass}
                        underlineColor="transparent"
                        onChangeText={(text) => setPass(text)}
                    />
                    <View style={{alignItems: 'flex-end'}}>
                        <Link component={TouchableOpacity} to="/password_recover">
                            <Caption>Forgot password?</Caption>
                        </Link>
                    </View>
                </View>
                <View>
                    <Button style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
                        Log in
                    </Button>
                    <Link component={TouchableOpacity} to="/signup">
                        <Caption style={styles.text}>Sign up</Caption>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
}

export default Login;
