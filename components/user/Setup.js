import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
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
import GetLocation from 'react-native-get-location';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCropAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import gravatar from 'gravatar';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import * as geofire from 'geofire-common';

import setupStyles from '../../styles/auth/setup';
import AppContext from '../../contexts/AppContext';
import LightHeader from '../layouts/LightHeader';
import {getUserById, updateUserById} from '../../api/user';
import {getTagByName} from '../../api/tags';
import {getAgeFromDate} from '../../helpers/date';
import {isName} from '../../validators/user';

const styles = StyleSheet.create(setupStyles);
const gravatarPicOptions = {
  s: '550',
  r: 'x',
  d: 'identicon',
};

function Setup() {
  const history = useHistory();
  const {user, setComplete, complete} = useContext(AppContext);

  const defaultGravatarImage = gravatar.url(
    user.email,
    gravatarPicOptions,
    'https',
  );

  const [init, setInit] = useState(true);
  const [error, setError] = useState([]);
  const [tag, setTag] = useState('');
  const [date, setDate] = useState(Date.now());
  const [showTagModal, setShowTagModal] = useState(false);
  const [previewImage, setPreviewImage] = useState({
    img: defaultGravatarImage,
    ext: false,
  });
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [choosedTags, setChoosedTags] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userinfo, setUserinfo] = useState({
    uid: user.uid,
    name: '',
    picture: defaultGravatarImage,
    tags: [],
    status: '',
    age: 0,
    minAge: 18,
    gender: 0,
    interestedIn: 1,
    location: {longitute: 0, latitude: 0, geohash: ''},
  });

  useEffect(() => {
    let isMounted = true;

    getUserById(user.uid)
      .then((loggedUser) => {
        if (isMounted) {
          if (loggedUser.complete) {
            setUserinfo(loggedUser);
            setPreviewImage({img: loggedUser.picture, ext: false});
            setDate(
              new Date(new Date(Date.now()).getFullYear() - loggedUser.age, 1),
            );
            setInit(false);
          }

          if (!loggedUser.complete) {
            setUserinfo({...userinfo, ...loggedUser});
            setInit(false);
          }

          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000,
          })
            .then(({longitude, latitude}) =>
              setUserinfo((p) => ({...p, location: {longitude, latitude}})),
            )
            .catch((err) => console.error(err, 'Setup useEffect error'));
        }
      })
      .catch((err) => console.error(err, 'Setup useEffect error'));

    return () => {
      isMounted = false;
    };
  }, []);

  function onChangeDate(e, selectedDate) {
    setDate(selectedDate || date);
    setUserinfo((p) => ({
      ...p,
      age: getAgeFromDate(new Date(selectedDate || date)),
    }));
    setShowDatePicker(false);
  }

  async function saveProfileInfo() {
    setError([]);

    if (!isName(userinfo.name)) {
      return setError((p) => [
        ...new Set([...p, 'Use A-z for a name with length in range 3-20']),
      ]);
    }

    if (+userinfo.minAge < 18) {
      return setError((p) => [
        ...new Set([...p, 'Min age must be a number greater than 18']),
      ]);
    }

    if (userinfo.age < 18) {
      return setError((p) => [
        ...new Set([...p, 'You must be older than 18 yo']),
      ]);
    }

    let userImg;
    if (previewImage.ext) {
      try {
        const path = `user_images/${user.uid}.${previewImage.ext}`;
        const ref = storage().ref(path);
        await ref.putFile(previewImage.img);
        userImg = await storage().ref(path).getDownloadURL();
      } catch (err) {
        console.error(err);
      }
    }

    try {
      await updateUserById({
        ...userinfo,
        complete: true,
        saved: userinfo.saved || [],
        liked: userinfo.liked || [],
        disliked: userinfo.disliked || [],
        minAge: +userinfo.minAge,
        location: {
          ...userinfo.location,
          geohash: geofire.geohashForLocation([
            parseFloat(userinfo.location.latitude),
            parseFloat(userinfo.location.longitude),
          ]),
        },
        picture: userImg || userinfo.picture || defaultGravatarImage,
      });

      setComplete(true);
      history.push('/');
    } catch (err) {
      console.log(err, 'Setup updateUserById error');
    }
  }

  function findTag(text) {
    setTag(text);
    if (text.length > 1) {
      getTagByName(text)
        .then((tags) => setChoosedTags(tags))
        .catch((err) => console.error(err, 'Setup getTagByName error'));
    }
  }

  function cropImg() {
    ImagePicker.openPicker({
      width: 1080,
      height: 1920,
      cropping: true,
    })
      .then(async (image) => {
        setPreviewImage({img: image.path, ext: image.path.split('.').pop()});
        setIsPreviewing(true);
      })
      .catch((err) => console.log(err));
  }

  function addToTags(tg) {
    if (userinfo.tags.indexOf(tg) !== -1) {
      return;
    }
    setChoosedTags((p) => p.filter((e) => e.name !== tg));
    setUserinfo((p) => ({...p, tags: [...p.tags, tg]}));
  }

  const confirmDeletAlert = (tagName) =>
    Alert.alert(
      'Confirm',
      `Do you want to remove ${tagName}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          onPress: () => {
            setUserinfo((p) => ({
              ...p,
              tags: p.tags.filter((e) => e !== tagName),
            }));
          },
        },
      ],
      {cancelable: false},
    );

  if (init) {
    return null;
  }

  return (
    <ScrollView style={styles.page}>
      <LightHeader
        title="Set up profile"
        redirect={!user || (user && !complete) ? '/login' : null}
      />

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
          <Image style={styles.avatar} source={{uri: previewImage.img}} />

          <View style={styles.cropView}>
            <TouchableOpacity onPress={() => cropImg()}>
              <FontAwesomeIcon
                icon={faCropAlt}
                size={30}
                style={styles.cropIcon}
              />
            </TouchableOpacity>
          </View>

          {isPreviewing && (
            <View style={styles.removeView}>
              <TouchableOpacity
                onPress={() => {
                  setPreviewImage({img: defaultGravatarImage, ext: false});
                  setIsPreviewing(false);
                }}>
                <FontAwesomeIcon
                  icon={faTrash}
                  size={30}
                  style={styles.removeIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.w100}
            mode="flat"
            label="Name"
            value={userinfo.name}
            underlineColor="transparent"
            onChangeText={(name) => setUserinfo((p) => ({...p, name}))}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            style={styles.w100}
            mode="flat"
            label="Status"
            multiline={true}
            value={userinfo.status}
            underlineColor="transparent"
            onChangeText={(status) => setUserinfo((p) => ({...p, status}))}
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
            selectedValue={userinfo.gender}
            style={styles.picker}
            mode="dialog"
            onValueChange={(gender) => setUserinfo((p) => ({...p, gender}))}>
            <Picker.Item label="Male" value={0} />
            <Picker.Item label="Female" value={1} />
            <Picker.Item label="Other" value={2} />
          </Picker>
        </View>

        <View style={styles.row}>
          <Paragraph style={styles.rowTitle}>Interested in</Paragraph>
          <Picker
            selectedValue={userinfo.interestedIn}
            style={styles.picker}
            mode="dialog"
            onValueChange={(interestedIn) =>
              setUserinfo((p) => ({...p, interestedIn}))
            }>
            <Picker.Item label="Women" value={1} />
            <Picker.Item label="Men" value={0} />
            <Picker.Item label="Both" value={2} />
          </Picker>
        </View>

        <View style={styles.row}>
          <Paragraph style={styles.rowTitle}>Min age to show</Paragraph>
          <TextInput
            style={styles.numericInput}
            mode="flat"
            keyboardType="numeric"
            value={String(userinfo.minAge || 18)}
            underlineColor="transparent"
            maxLength={2}
            onChangeText={(minAge) => setUserinfo((p) => ({...p, minAge}))}
          />
        </View>

        <View>
          <Paragraph style={{...styles.rowTitle, ...styles.chips}}>
            Tags
          </Paragraph>
          <View style={styles.row}>
            {userinfo.tags.map((tg, i) => (
              <Chip
                key={i}
                mode="outlined"
                style={styles.chips}
                onPress={() => confirmDeletAlert(tg)}>
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

export default Setup;
