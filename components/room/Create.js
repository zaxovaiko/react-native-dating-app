import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useHistory} from 'react-router-native';
import {Appbar, Button, Text, TextInput, Chip} from 'react-native-paper';

// import {page} from '../../styles/index';

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

function Create() {
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
                <Appbar.Content title="New thematic room" />
            </Appbar.Header>

            <View style={{...styles.page, ...styles.container}}>
                <View>
                    <TextInput
                        style={styles.input}
                        label="Room name"
                        value={''}
                        underlineColor="transparent"
                        onChangeText={(text) => {}}
                    />
                    <TextInput
                        style={styles.input}
                        label="Room topic"
                        value={''}
                        underlineColor="transparent"
                        onChangeText={(text) => {}}
                    />
                    <View>
                        <Text style={{fontWeight: 'bold', marginBottom: 10}}>Interests</Text>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            <Chip
                                mode="outlined"
                                style={{marginRight: 5, marginBottom: 4}}
                                onPress={() => console.log('Pressed')}>
                                sport
                            </Chip>
                            <Chip
                                mode="outlined"
                                style={{marginRight: 5, marginBottom: 4}}
                                onPress={() => console.log('Pressed')}>
                                cooking
                            </Chip>
                            <Chip
                                mode="outlined"
                                style={{marginRight: 5, marginBottom: 4}}
                                onPress={() => console.log('Pressed')}>
                                instagram
                            </Chip>
                            <Chip
                                mode="outlined"
                                style={{marginRight: 5, marginBottom: 4}}
                                onPress={() => console.log('Pressed')}>
                                books
                            </Chip>
                            <Chip
                                mode="outlined"
                                style={{marginRight: 5, marginBottom: 4}}
                                onPress={() => console.log('Pressed')}>
                                movies
                            </Chip>
                            <Chip
                                mode="outlined"
                                icon="plus"
                                style={{marginRight: 5, marginBottom: 4}}
                                onPress={() => console.log('Pressed')}>
                                Add
                            </Chip>
                        </View>
                    </View>
                </View>

                <Button
                    style={{...styles.btn, ...{marginLeft: 'auto', marginRight: 'auto'}}}
                    mode="contained"
                    onPress={() => {
                        history.push('/login');
                    }}>
                    Create
                </Button>
            </View>
        </View>
    );
}

export default Create;
