import firestore from '@react-native-firebase/firestore';

export function getUserById(uid) {
  return firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then((doc) => {
      if (!doc) {
        throw new Error('User was not found');
      }
      return doc.data();
    });
}

export function getUserByCriteria(cryteria) {
  // return firestore().collection('users').where('')
}

export function updateUserById(uid, newUser) {
  return firestore().collection('users').doc(uid).update(newUser);
}

export function createUser(user) {
  return firestore().collection('users').doc(user.uid).set({
    email: user.email,
    complete: false,
  });
}
