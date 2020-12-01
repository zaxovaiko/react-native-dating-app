  
import React from 'react';
import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import {useHistory, Link} from 'react-router-native';
import {Appbar, Text} from 'react-native-paper';

import {
    scroll,
    page,
    container,
    input,
    chatImg,
    chatView,
    chatText0,
    chatText,
    chatText2,
    chatText3,
    FlexStyle,
    peopleIcon,
} from '../../styles/index';

// import {page} from '../../styles/index';

const styles = StyleSheet.create({
    scroll,
    container,
    page,
    input,
    chatImg,
    chatView,
    chatText0,
    chatText,
    chatText2,
    chatText3,
    FlexStyle,
    peopleIcon,
});


function CreateChats() {
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
                        <View style={
                                styles.chatView
                        }>
                            <View>
                            <Link to="">
                                <Text style={styles.chatText}>Jessica</Text>
                            </Link>
                            <Link to="">
                                <Text style={styles.chatText2}>Lunch today?</Text>
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
                                <Text style={styles.chatText}>Ola</Text>
                            </Link>
                            <Link to="">
                                <Text style={styles.chatText2}>Hello! Nice photos :)</Text>
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
                                <Text style={styles.chatText}>Mary</Text>
                            </Link>
                            <Link to="">
                                <Text style={styles.chatText2}>Same to you</Text>
                            </Link>
                            </View>
                                <Text style={styles.chatText3}>today</Text>
                        </View>
                    </ImageBackground>
            </View>
            
        </View>
        
    );
}

export default CreateChats;
