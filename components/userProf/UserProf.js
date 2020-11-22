import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useHistory} from 'react-router-native';
import {Appbar, Text, Image, Chip} from 'react-native-paper';
import {scroll, page, container, input} from '../../styles/index';

const styles = StyleSheet.create({
    scroll,
    container,
    page,
    input,
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
                    <View style={{width: '100%', backgroundColor: '#000', height: 380}}>
                        <View style={{top: 320, width: '100%', backgroundColor: 'rgba(169,169,169, 0.1)', height: 55}}>
                            <Text style={{left: 30, fontSize: 25}}>Celestino Dare, 21</Text>
                            <Text style={{left: 30, fontSize: 15}}>Ivano-Frankivsk, Ukraine</Text>
                        </View>
                    </View>
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
                    <Text style={{fontSize: 15, fontWeight: 'bold', left: 15}}>Interests:</Text>
                </View>
                <View style={{...styles.page, ...styles.container, flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Chip mode="outlined" style={{marginRight: 5, marginBottom: 4}}>
                        sport
                    </Chip>
                    <Chip mode="outlined" style={{marginRight: 5, marginBottom: 4}}>
                        cooking
                    </Chip>
                    <Chip mode="outlined" style={{marginRight: 5, marginBottom: 4}}>
                        instagram
                    </Chip>
                </View>
                <View style={{...styles.page, ...styles.container}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>Instagram photos:</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View
                            style={{
                                marginRight: 5,
                                marginBottom: 4,
                                backgroundColor: '#000',
                                width: '23.5%',
                                height: 90,
                            }}></View>
                        <View
                            style={{
                                marginRight: 5,
                                marginBottom: 4,
                                backgroundColor: '#000',
                                width: '23.5%',
                                height: 90,
                            }}></View>
                        <View
                            style={{
                                marginRight: 5,
                                marginBottom: 4,
                                backgroundColor: '#000',
                                width: '23.5%',
                                height: 90,
                            }}></View>
                        <View
                            style={{
                                marginRight: 5,
                                marginBottom: 4,
                                backgroundColor: '#000',
                                width: '23.5%',
                                height: 90,
                            }}></View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Profil;
