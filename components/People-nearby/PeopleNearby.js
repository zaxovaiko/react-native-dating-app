import React from 'react';
import {ScrollView, StyleSheet, View, ImageBackground, Image} from 'react-native';
import {useHistory} from 'react-router-native';
import {Appbar, Text} from 'react-native-paper';
import {
    scroll,
    page,
    container,
    input,
    peopleNrbImg,
    peopleNrbView,
    peopleNrbText,
    FlexStyle,
    peopleImg,
} from '../../styles/index';

const styles = StyleSheet.create({
    scroll,
    container,
    page,
    input,
    peopleNrbImg,
    peopleNrbView,
    peopleNrbText,
    FlexStyle,
    peopleImg,
});

function PeopleNearby() {
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
                    <Appbar.Content title="People nearby" />
                </Appbar.Header>

                <View style={{...styles.page, ...styles.container, ...styles.FlexStyle}}>
                    <ImageBackground style={{...styles.peopleNrbImg}}>
                        <Image source={require('../iconPhoto/User1.jpg')} style={{...styles.peopleImg}}></Image>
                        <View
                            style={{
                                ...styles.peopleNrbView,
                            }}>
                            <Text style={{...styles.peopleNrbText}}>2 km</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground style={{...styles.peopleNrbImg}}>
                        <Image source={require('../iconPhoto/User2.jpg')} style={{...styles.peopleImg}}></Image>
                        <View
                            style={{
                                ...styles.peopleNrbView,
                            }}>
                            <Text style={{...styles.peopleNrbText}}>15 km</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground style={{...styles.peopleNrbImg}}>
                        <Image source={require('../iconPhoto/user3.jpg')} style={{...styles.peopleImg}}></Image>
                        <View
                            style={{
                                ...styles.peopleNrbView,
                            }}>
                            <Text style={{...styles.peopleNrbText}}>9 km</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground style={{...styles.peopleNrbImg}}>
                        <Image source={require('../iconPhoto/user4.jpg')} style={{...styles.peopleImg}}></Image>
                        <View
                            style={{
                                ...styles.peopleNrbView,
                            }}>
                            <Text style={{...styles.peopleNrbText}}>1 km</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground style={{...styles.peopleNrbImg}}>
                        <Image source={require('../iconPhoto/user5.jpg')} style={{...styles.peopleImg}}></Image>
                        <View
                            style={{
                                ...styles.peopleNrbView,
                            }}>
                            <Text style={{...styles.peopleNrbText}}>5 km</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground style={{...styles.peopleNrbImg}}>
                        <Image source={require('../iconPhoto/user6.jpg')} style={{...styles.peopleImg}}></Image>
                        <View
                            style={{
                                ...styles.peopleNrbView,
                            }}>
                            <Text style={{...styles.peopleNrbText}}>2 km</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground style={{...styles.peopleNrbImg}}>
                        <Image source={require('../iconPhoto/user7.png')} style={{...styles.peopleImg}}></Image>
                        <View
                            style={{
                                ...styles.peopleNrbView,
                            }}>
                            <Text style={{...styles.peopleNrbText}}>4 km</Text>
                        </View>
                    </ImageBackground>
                    <ImageBackground style={{...styles.peopleNrbImg}}>
                        <Image source={require('../iconPhoto/user8.jpg')} style={{...styles.peopleImg}}></Image>
                        <View
                            style={{
                                ...styles.peopleNrbView,
                            }}>
                            <Text style={{...styles.peopleNrbText}}>10 km</Text>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        </View>
    );
}

export default PeopleNearby;
