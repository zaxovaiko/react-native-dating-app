  
import React from 'react';
import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import {useHistory, Link} from 'react-router-native';
import {Appbar, Text} from 'react-native-paper';


function Chats() {
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
                <Appbar.Content title="Messages" />
            </Appbar.Header>
            
            <View style={{...styles.page, ...styles.container, ...styles.FlexStyle}}>
                    <ImageBackground style={{...styles.chatImg}}>
                        <Image source={require('../icons/download.png')} style={{...styles.peopleIcon}}></Image>
                        <View style={
                                styles.chatView
                            }>
                            <View>
                            <Link to="/chats/groupchats">
                                <Text style={styles.chatText0}>Groups</Text>
                            </Link>
                            </View>
                        </View>
                    </ImageBackground>
                    <ImageBackground style={{...styles.chatImg}}>
                        <Image source={require('../icons/User1.jpg')} style={{...styles.peopleIcon}}></Image>
                        <View style={styles.chatView}>
                            <View>
                                <Link to="">
                                    <Text>Jessica</Text>
                                </Link>
                                <Link to="">
                                    <Text>Lunch today?</Text>
                                </Link>
                            </View>
                                <Text style={styles.chatText3}>now</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground style={styles.chatImg}>
                        <Image source={require('../icons/User2.jpg')} style={{...styles.peopleIcon}}></Image>
                        
                        <View style={styles.chatView}>
                            <View>
                            <Link to="">
                                <Text>Ola</Text>
                            </Link>
                            <Link to="">
                                <Text>Hello! Nice photos :)</Text>
                            </Link>
                            </View>
                                <Text style={styles.chatText3}>17:15</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground style={styles.chatImg}>
                        <Image source={require('../icons/UserPhoto1.jpg')} style={{...styles.peopleIcon}}></Image>
                        
                        <View style={styles.chatView}>
                            <View>
                            <Link to="">
                                <Text>Mary</Text>
                            </Link>
                            <Link to="">
                                <Text>Same to you</Text>
                            </Link>
                            </View>
                                <Text style={styles.chatText3}>today</Text>
                        </View>
                    </ImageBackground>
            </View>
            
        </View>
        
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
    },
    page: {
        flex: 1,
        flexDirection: 'column',
    },
    chatImg: {
        width: '95%',
        height: 70,
        marginLeft: 9,
        marginBottom: 15,
        borderColor: '#000',
    },
    chatView: {
        top: -60,
        left: 80,
        width: '75%',
        height: 20,
        flexDirection: 'row'
    },
    chatText0: {
        top: 12,
        height: 50,
        width: 250
    },
    chatText3: {
        marginLeft: 'auto'
    },
    FlexStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    peopleIcon: {
        width: 70,
        borderRadius: 150,
        height: 70,
    },
});

export default Chats;
