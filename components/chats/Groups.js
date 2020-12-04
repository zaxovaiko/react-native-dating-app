import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Link} from 'react-router-native';
import {Text} from 'react-native-paper';
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
import LightHeader from '../layouts/LightHeader';

function Groups() {
  return (
    <View style={styles.scroll}>
      <LightHeader title="Groups" />

      <View style={{...styles.page, ...styles.container, ...styles.FlexStyle}}>

        <View style={styles.chatImg}>
          <Image
            source={{uri: 'https://via.placeholder.com/300'}}
            style={styles.peopleIcon}
          />
          <View style={styles.chatView}>
            <View>
              <Link to="">
                <Text style={styles.chatText}>Dream Team</Text>
              </Link>
              <View style={styles.chatRows}>
                <Link to="">
                  <Text style={{fontWeight: 'bold', marginRight: 5}}>
                    John:
                  </Text>
                </Link>
                <Link to="">
                  <Text>Lunch today?</Text>
                </Link>
              </View>
            </View>
            <Text style={styles.chatText3}>now</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

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

export default Groups;
