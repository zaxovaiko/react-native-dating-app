import firestore from '@react-native-firebase/firestore';
import * as lookup from 'country-code-lookup';
import locationHelper from '../helpers/location';

const API_WEATHER_KEY = 'b858d37e1324d289241c87a0f3fa70d3';

// Get entire document by user id from users collection
export function getInfoByUserId(uid) {
  return firestore()
    .collection('users')
    .where('uid', '==', uid)
    .limit(1)
    .get()
    .then((res) => {
      if (res.docs.length === 0) {
        throw new Error('User was not found');
      }
      return res.docs[0];
    });
}

// Gets userinfo from users collection by user id
export function getUserById(uid) {
  return getInfoByUserId(uid)
    .then((user) => user.data())
    .catch((err) => console.warn(err));
}

// Update user in users collection
export function updateUserById(user) {
  // Use this hack to get country and city name
  const query = `https://api.openweathermap.org/data/2.5/weather?lat=${user.location.latitude}&lon=${user.location.longitude}&appid=${API_WEATHER_KEY}`;

  return fetch(query)
    .then((res) => res.json())
    .then((res) => {
      user.city = res.name || 'Unknown';
      user.country = lookup.byIso(res.sys.country).country || 'Unknown';
      return getInfoByUserId(user.uid).then((doc) =>
        firestore().collection('users').doc(doc.id).update(user),
      );
    })
    .catch((err) => console.warn(err));
}

// Gets users continiously with parameters
export function getUserFilteredByLocation({interestedIn, location}, startAt) {
  const {lower, upper} = locationHelper(location, 200);

  let ref = firestore().collection('users').where('complete', '==', true);

  if (interestedIn !== 2) {
    ref = ref.where('gender', '==', interestedIn);
  }

  ref
    .orderBy('location.geohash')
    .where('location.geohash', '>=', lower)
    .where('location.geohash', '<=', upper);

  if (startAt) {
    ref = ref.startAt(startAt);
  }

  return ref
    .limit(2)
    .get()
    .then((docs) => {
      if (docs.docs.length === 0) {
        throw new Error('Users were not found.');
      }
      if (docs.docs.length === 2) {
        return {current: docs.docs[0], next: docs.docs[1]};
      }
      return {current: docs.docs[0], next: null};
    })
    .catch((err) => console.log(err, 'API user error'));
}

// Adds user to users collection
export function createUser(user) {
  return firestore().collection('users').add({
    email: user.email,
    uid: user.uid,
    complete: false,
    rooms: []
  });
}

// Populates saved users
export function getSaved(uid) {
  return getUserById(uid)
    .then(async (res) => {
      const savedUsers = [];
      for (const su of res.saved) {
        savedUsers.push(await getUserById(su));
      }
      return savedUsers;
    })
    .catch((err) => console.log(err, 'API user saved error'));
}

// Get all people who liked user with ui
export function getLiked(uid) {
  return firestore()
    .collection('users')
    .where('liked', 'array-contains', uid)
    .where('uid', '!=', uid)
    .get()
    .then((docs) => {
      if (docs.docs.length === 0) {
        throw new Error('Users were not found.');
      }
      return docs.docs.map((e) => e.data());
    });
}

// Check if user a likes user b
export function isLikingUser(uidA, uidB) {
  return firestore()
    .collection('users')
    .where('uid', '==', uidA)
    .where('liked', 'array-contains', uidB)
    .get()
    .then((docs) => Promise.resolve(docs.docs.length !== 0));
}
