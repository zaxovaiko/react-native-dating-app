import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useHistory} from 'react-router-native';

function LightHeader({title}) {
  const history = useHistory();

  return (
    <Appbar.Header dark={false} style={styles.transparentHeader}>
      <Appbar.BackAction onPress={() => history.goBack()} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  transparentHeader: {
    backgroundColor: '#fff',
    borderColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
});

export default LightHeader;
