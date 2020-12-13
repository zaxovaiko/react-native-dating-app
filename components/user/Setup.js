import React, {useState, useContext, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {useHistory} from 'react-router-native';
import {
  Paragraph,
  Text,
  Chip,
  Button,
  Portal,
  Dialog,
  TextInput,
} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import GetLocation from 'react-native-get-location';
import geohash from 'ngeohash';
import gravatar from 'gravatar';

import AppContext from '../../contexts/AppContext';
import LightHeader from '../layouts/LightHeader';
import {getUserById, updateUserById} from '../../api/user';
import {getTagByName} from '../../api/tags';

function Setup() {
  const history = useHistory();
  const {user, setComplete} = useContext(AppContext);

  const [showTagModal, setShowTagModal] = useState(false);
  const [choosedTags, setChoosedTags] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState([]);
  const [tag, setTag] = useState('');

  const [name, setName] = useState('');
  const [picture, setPicture] = useState(
    'https://via.placeholder.com/1000.jpg',
  );
  const [status, setStatus] = useState('');
  const [minAge, setMinAge] = useState('18');
  const [date, setDate] = useState(Date.now());
  const [gender, setGender] = useState('Gender');
  const [interestedIn, setInterestedIn] = useState('Interested in');
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState({
    longitude: '',
    latitude: '',
    geohash: '',
  });

  useEffect(() => {
    let isMounted = true;

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((loc) => {
        const {longitude, latitude} = loc;
        if (isMounted) {
          setLocation({
            latitude,
            longitude,
            geohash: geohash.encode(latitude, longitude),
          });
        }
      })
      .catch((err) => {
        const {code, message} = err;
        console.warn(code, message);
        console.log('Setup useEffect error');
      });

    getUserById(user.uid)
      .then((usr) => {
        if (isMounted) {
          const dt = new Date(
            new firestore.Timestamp(
              parseInt(usr.birth.seconds, 10),
              parseInt(usr.birth.nanoseconds, 10),
            ).toMillis(),
          );

          setName(usr.name);
          setStatus(usr.status);
          setDate(dt);
          setMinAge(usr.minAge);
          setInterestedIn(usr.interestedIn);
          setTags(usr.tags);
          setGender(usr.gender);
          setPicture(usr.picture);
        }
      })
      .catch((err) => console.log(err, 'Setup useEffect error'));

    return () => {
      isMounted = false;
    };
  }, []);

  function onChangeDate(e, selectedDate) {
    setDate(selectedDate || date);
    setShowDatePicker(false);
  }

  function saveProfileInfo() {
    setError([]);

    if (name.length > 20 || name.length < 3) {
      return setError((p) => [
        ...new Set([...p, 'Name length must be in range 3, 20']),
      ]);
    }

    const dateObj = new Date(date);
    if (
      new Date(
        dateObj.getFullYear() + 18,
        dateObj.getMonth() - 1,
        dateObj.getDay(),
      ) > new Date()
    ) {
      return setError((p) => [
        ...new Set([...p, 'You can not be younger than 18 yo']),
      ]);
    }

    updateUserById(user.uid, {
      gender,
      status,
      interestedIn,
      minAge,
      tags,
      birth: date,
      complete: true,
      name,
      location,
      picture: gravatar.url(
        user.email,
        {
          s: '350',
          r: 'x',
          d: 'identicon',
        },
        true,
      ),
    })
      .then(() => {
        setComplete(true);
        history.push('/');
      })
      .catch((err) => console.log(err, 'Setup updateUserById error'));
  }

  function findTag(text) {
    setTag(text);
    if (text.length > 1) {
      getTagByName(text)
        .then((docs) => setChoosedTags(docs.docs.map((e) => e.data())))
        .catch((err) => console.log(err, 'Setup getTagByName error'));
    }
  }

  function addToTags(tg) {
    if (tags.indexOf(tg) !== -1) {
      return;
    }
    setTags((p) => [...p, tg]);
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
            <TextInput
              placeholder="Type word"
              underlineColor="transparent"
              mode="flat"
              style={styles.findTag}
              onChangeText={(text) => findTag(text)}
              value={tag}
            />
            <View style={styles.row}>
              {choosedTags.length === 0 && <Text>Nothing was found</Text>}
              {choosedTags.length !== 0 &&
                choosedTags.map((tg, i) => (
                  <Chip
                    key={i}
                    mode="outlined"
                    style={styles.chips}
                    onPress={() => addToTags(tg.name)}>
                    {tg.name}
                  </Chip>
                ))}
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowTagModal(false)}>Close</Button>
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
              uri: picture,
            }}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.w100}
            mode="flat"
            label="Name"
            value={name}
            underlineColor="transparent"
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.w100}
            mode="flat"
            label="Status"
            multiline={true}
            value={status}
            underlineColor="transparent"
            onChangeText={(text) => setStatus(text)}
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

        <View style={styles.row}>
          <Paragraph style={styles.rowTitle}>Min age to show</Paragraph>
          <TextInput
            style={styles.numericInput}
            mode="flat"
            keyboardType="numeric"
            value={minAge}
            underlineColor="transparent"
            maxLength={2}
            onChangeText={(text) => setMinAge(text.replace(/(^0|[^0-9]+)/, ''))}
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
                onPress={() => setTags((p) => p.filter((_, idx) => idx !== i))}>
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

        {error.length > 0 && (
          <Text style={styles.error}>{error.join('\n')}</Text>
        )}

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
  findTag: {
    borderRadius: 5,
    marginBottom: 10,
  },
  w100: {
    width: '100%',
  },
  numericInput: {
    width: 45,
    marginLeft: 'auto',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: 120,
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
