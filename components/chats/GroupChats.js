  
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
    chatRows,
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
    chatRows,
    chatText0,
    chatText,
    chatText2,
    chatText3,
    FlexStyle,
    peopleIcon,
});


function CreateGroupChats() {
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
                <Appbar.Content title="Group chats" />
            </Appbar.Header>
            
            <View style={{...styles.page, ...styles.container, ...styles.FlexStyle}}>
                    <ImageBackground style={{...styles.chatImg}}>
                        <Image source={require('../icons/GroupPhoto.png')} style={{...styles.peopleIcon}}></Image>
                        <View style={
                                styles.chatView
                        }>
                            <View>
                            <Link to="">
                                <Text style={styles.chatText}>Dream Team</Text>
                            </Link>
                                <View style={styles.chatRows}>
                                    <Link to="">
                                        <Text style={{fontWeight: 'bold', marginRight: 5}}>John:</Text>
                                    </Link>
                                    <Link to="">
                                        <Text>Lunch today?</Text>
                                    </Link>
                                </View>
                            </View>
                                <Text style={styles.chatText3}>now</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground style={{...styles.chatImg}}>
                        <Image source={require('../icons/GroupPhoto2.jpg')} style={{...styles.peopleIcon}}></Image>
                        <View style={
                                styles.chatView
                        }>
                            <View>
                            <Link to="">
                                <Text style={styles.chatText}>Students</Text>
                            </Link>
                                <View style={styles.chatRows}>
                                    <Link to="">
                                        <Text style={{fontWeight: 'bold'}}>Mark: </Text>
                                    </Link>
                                    <Link to="">
                                        <Text>Math starts at 13:15</Text>
                                    </Link>
                                </View>
                            </View>
                                <Text style={styles.chatText3}>12:13</Text>
                        </View>
                    </ImageBackground>
            </View>
            
        </View>
        
    );
}

export default CreateGroupChats;
