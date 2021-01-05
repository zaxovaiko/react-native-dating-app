import firestore from '@react-native-firebase/firestore';
import locationHelper from '../helpers/location';

// Get entire document by user id from users collection
function getInfoByUserId(uid) {
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
  return getInfoByUserId(user.uid).then((doc) => {
    return firestore().collection('users').doc(doc.id).update(user);
  });
}

export function* getUserByCriteria({interestedIn, location}) {
  //
}

// Gets users continiously with parameters
export function getUserFilteredByLocation({interestedIn, location}, startAt) {
  const {lower, upper} = locationHelper(location, 200);

  let ref = firestore()
    .collection('users')
    .where('complete', '==', true)
    .where('gender', '==', interestedIn)
    .orderBy('location.geohash')
    .where('location.geohash', '>=', lower)
    .where('location.geohash', '<=', upper);

  if (startAt) {
    ref = ref.startAt(startAt);
  }

  // TODO: Add age filter and interestedAt filter
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
  });
}

export function saveUser(uid, saveUid) {}

export function likeUser(uid, likeUid) {}

export function dislikeUser(uid, dislikeUid) {}
