import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useHistory} from 'react-router-native';
import {Appbar, Text, Image} from 'react-native-paper';
import {scroll, page, container, input, peopleNrbImg, peopleNrbView, peopleNrbText} from '../../styles/index';

const styles = StyleSheet.create({
    scroll,
    container,
    page,
    input,
    peopleNrbImg,
    peopleNrbView,
    peopleNrbText,
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

                <View style={{...styles.page, ...styles.container, flexDirection: 'row', flexWrap: 'wrap'}}>
                    <View style={{...styles.peopleNrbImg}}>
                        <View style={{...styles.peopleNrbView}}>
                            <Text style={{...styles.peopleNrbText}}>2 km</Text>
                        </View>
                    </View>
                    <View style={{...styles.peopleNrbImg}}>
                        <View style={{...styles.peopleNrbView}}>
                            <Text style={{...styles.peopleNrbText}}>4 km</Text>
                        </View>
                    </View>
                    <View style={{...styles.peopleNrbImg}}>
                        <View style={{...styles.peopleNrbView}}>
                            <Text style={{...styles.peopleNrbText}}>10 km</Text>
                        </View>
                    </View>
                    <View style={{...styles.peopleNrbImg}}>
                        <View style={{...styles.peopleNrbView}}>
                            <Text style={{...styles.peopleNrbText}}>7 km</Text>
                        </View>
                    </View>
                    <View style={{...styles.peopleNrbImg}}>
                        <View style={{...styles.peopleNrbView}}>
                            <Text style={{...styles.peopleNrbText}}>1 km</Text>
                        </View>
                    </View>
                    <View style={{...styles.peopleNrbImg}}>
                        <View style={{...styles.peopleNrbView}}>
                            <Text style={{...styles.peopleNrbText}}>5 km</Text>
                        </View>
                    </View>
                    <View style={{...styles.peopleNrbImg}}>
                        <View style={{...styles.peopleNrbView}}>
                            <Text style={{...styles.peopleNrbText}}>15 km</Text>
                        </View>
                    </View>
                    <View style={{...styles.peopleNrbImg}}>
                        <View style={{...styles.peopleNrbView}}>
                            <Text style={{...styles.peopleNrbText}}>3 km</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default PeopleNearby;
