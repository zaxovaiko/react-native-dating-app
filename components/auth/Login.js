import React, {useState} from 'react';
import {Text, Title, TextInput, Button, Caption} from 'react-native-paper';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Link} from 'react-router-native';

import {fixedBtn, input, page, flexContainer, container, colors} from '../../styles/index';

const styles = StyleSheet.create({
    page,
    flexContainer,
    container,
    text: {
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
    input,
    fixedBtn,
    floatRight: {
        alignItems: 'flex-end',
    },
    color: colors.primary,
});

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <ScrollView contentContainerStyle={{...styles.container, ...styles.page}}>
            <View style={styles.flexContainer}>
                <Text style={{...styles.text, ...styles.color}}>lover</Text>
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
                    <View style={styles.floatRight}>
                        <Link component={TouchableOpacity} to="/password_recover">
                            <Caption>Forgot password?</Caption>
                        </Link>
                    </View>
                </View>
                <View>
                    <Button style={styles.fixedBtn} mode="contained" onPress={() => console.log('Pressed')}>
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
