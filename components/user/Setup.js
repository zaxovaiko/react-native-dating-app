import React, {useState, useContext} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {
  Paragraph,
  Text,
  Chip,
  Button,
  Portal,
  Dialog,
  TextInput,
} from 'react-native-paper';
import AppContext from '../../contexts/AppContext';
import Slider from '@react-native-community/slider';
import LightHeader from '../layouts/LightHeader';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import Filter from 'bad-words';

const filter = new Filter();

function Setup() {
  const {user, setComplete} = useContext(AppContext);

  const [minAge, setMinAge] = useState(18);
  const [gender, setGender] = useState('Gender');
  const [interestedIn, setInterestedIn] = useState('Interested in');

  const [modalError, setModalError] = useState('');
  const [showTagModal, setShowTagModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');
  const [date, setDate] = useState(Date.now());
  const [showDatePicker, setShowDatePicker] = useState(false);

  function onChangeDate(e, selectedDate) {
    setDate(selectedDate || date);
    setShowDatePicker(false);
  }

  function removeFromTags(idx) {
    setTags((p) => p.filter((e, i) => i !== idx));
  }

  function addTagToList() {
    if (tag.length > 12 || tag.length < 3) {
      setModalError('Word length must be in range 3 and 12');
      return;
    }
    setTags((p) => [...p, filter.clean(tag || '')]);
    setTag('');
    setModalError('');
    setShowTagModal(false);
  }

  function saveProfileInfo() {
    firestore()
      .collection('users')
      .where('uid', '==', user.uid)
      .get()
      .then((doc) => {
        firestore()
          .collection('users')
          .doc(doc.docs[0].id)
          .update({
            gender,
            interestedIn,
            minAge,
            tags,
            birth: date,
            complete: true,
          })
          .then(() => {
            setComplete(true);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.warn(err));
  }

  return (
    <ScrollView style={styles.page}>
      <LightHeader title="Set up profile" />

      <Portal>
        <Dialog
          visible={showTagModal}
          onDismiss={() => setShowTagModal((p) => !p)}>
          <Dialog.Title>Add interests</Dialog.Title>
          <Dialog.Content>
            {modalError.length > 0 && (
              <Text style={styles.error}>{modalError}</Text>
            )}
            <TextInput
              placeholder="Type word"
              mode="outlined"
              onChangeText={(text) => setTag(text)}
              value={tag}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => addTagToList()}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          display="default"
          onChange={onChangeDate}
        />
      )}

      <View
        style={{
          ...styles.container,
          ...styles.flexContainer,
          ...styles.fixes,
        }}>
        <View>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://via.placeholder.com/1000.jpg',
            }}
          />
        </View>

        <View style={styles.row}>
          <Paragraph style={styles.rowTitle}>Birthday</Paragraph>
          <Chip
            mode="outlined"
            style={styles.mr}
            onPress={() => setShowDatePicker(true)}>
            {new Date(date).toLocaleDateString('ru-RU')}
          </Chip>
        </View>

        <View style={styles.row}>
          <Paragraph style={styles.rowTitle}>Gender</Paragraph>
          <Picker
            selectedValue={gender}
            style={styles.picker}
            mode="dialog"
            onValueChange={(v) => setGender(v)}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <View style={styles.row}>
          <Paragraph style={styles.rowTitle}>Interested in</Paragraph>
          <Picker
            selectedValue={interestedIn}
            style={styles.picker}
            mode="dialog"
            onValueChange={(v) => setInterestedIn(v)}>
            <Picker.Item label="Women" value="women" />
            <Picker.Item label="Men" value="men" />
            <Picker.Item label="Both" value="both" />
          </Picker>
        </View>

        <View>
          <View style={styles.row}>
            <Paragraph style={styles.rowTitle}>Age</Paragraph>
            <Text style={styles.mr}>{minAge}</Text>
          </View>
          <Slider
            style={{...styles.slider, ...styles.row}}
            minimumValue={18}
            maximumValue={60}
            thumbTintColor="#6200ee"
            minimumTrackTintColor="#6200ee"
            maximumTrackTintColor="#6200ee"
            step={1}
            value={18}
            onValueChange={(e) => setMinAge(e)}
          />
        </View>

        <View>
          <Paragraph style={{...styles.rowTitle, ...styles.chips}}>
            Tags
          </Paragraph>
          <View style={styles.row}>
            {tags.map((tg, i) => (
              <Chip
                key={i}
                mode="outlined"
                style={styles.chips}
                onPress={() => removeFromTags(i)}>
                {tg}
              </Chip>
            ))}
            <Chip
              mode="outlined"
              style={styles.chips}
              onPress={() => setShowTagModal(true)}>
              +
            </Chip>
          </View>
        </View>

        <Button
          style={styles.fixedBtn}
          mode="contained"
          onPress={() => saveProfileInfo()}>
          Save profile
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
  },
  picker: {
    height: 40,
    width: 118,
    marginLeft: 'auto',
    fontSize: 10,
    textAlign: 'right',
  },
  flexContainer: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  container: {
    padding: 15,
  },
  fixedBtn: {
    marginHorizontal: 'auto',
  },
  fixes: {
    justifyContent: 'flex-start',
  },
  row: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  rowTitle: {
    fontWeight: '700',
    color: '#000',
  },
  mr: {
    marginLeft: 'auto',
  },
  chips: {
    marginBottom: 10,
    marginRight: 5,
  },
  slider: {
    height: 10,
    marginLeft: -15,
    marginRight: -15,
  },
  avatar: {
    width: 250,
    height: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
    borderRadius: 500,
  },
});

export default Setup;
