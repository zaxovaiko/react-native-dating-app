import React from 'react';
import {ScrollView, StyleSheet, View, ImageBackground, Image} from 'react-native';
import {useHistory} from 'react-router-native';
import {Appbar, Text, Chip} from 'react-native-paper';
import {
    scroll,
    page,
    container,
    input,
    UserInsta,
    UserProfTitle,
    FlexStyle,
    Dist,
    MainPhoto,
    UserViewName,
} from '../../styles/index';

const styles = StyleSheet.create({
    scroll,
    container,
    page,
    input,
    UserInsta,
    UserProfTitle,
    FlexStyle,
    Dist,
    MainPhoto,
    UserViewName,
});

function Profil() {
    const history = useHistory();

    return (
        <View style={styles.scroll}>
            <ScrollView>
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
                    <Appbar.Content title="User Profil" />
                </Appbar.Header>

                <View style={{...styles.page, ...styles.container}}>
                    <ImageBackground source={require('../iconPhoto/userPhoto.jpg')} style={{...styles.MainPhoto}}>
                        <View style={{...styles.UserViewName}}>
                            <Text style={{left: 30, fontSize: 25}}>Celestino Dare, 21</Text>
                            <Text style={{left: 30, fontSize: 15}}>Ivano-Frankivsk, Ukraine</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View style={{...styles.page, ...styles.container}}>
                    <Text>
                        I'm a frequent traveler, but not in the spontaneous sort of way. I love to plan my trips and go
                        out on mini-adventures once I feel comfortable there. You can say I'm an organized free spirit.
                        I love to try out new food, immerse myself in the beautiful culture of other places, and meet
                        locals. I'm excited to meet you so we can plan our next adventure together!
                    </Text>
                </View>
                <View style={{...styles.page}}>
                    <Text style={{...styles.UserProfTitle, left: 15}}>Interests:</Text>
                </View>
                <View style={{...styles.page, ...styles.container, ...styles.FlexStyle}}>
                    <Chip mode="outlined" style={{...styles.Dist}}>
                        sport
                    </Chip>
                    <Chip mode="outlined" style={{...styles.Dist}}>
                        cooking
                    </Chip>
                    <Chip mode="outlined" style={{...styles.Dist}}>
                        instagram
                    </Chip>
                </View>
                <View style={{...styles.page, ...styles.container}}>
                    <Text style={{...styles.UserProfTitle}}>Instagram photos:</Text>
                </View>
                <View style={{...styles.page, ...styles.container, ...styles.FlexStyle}}>
                    <Image source={require('../iconPhoto/UserPhoto1.jpg')} style={{...styles.UserInsta}}></Image>
                    <Image source={require('../iconPhoto/UserPhoto2.jpg')} style={{...styles.UserInsta}}></Image>
                    <Image source={require('../iconPhoto/UserPhoto3.jpg')} style={{...styles.UserInsta}}></Image>
                    <Image source={require('../iconPhoto/UserPhoto4.jpg')} style={{...styles.UserInsta}}></Image>
                </View>
            </ScrollView>
        </View>
    );
}

export default Profil;
