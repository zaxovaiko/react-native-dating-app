import firestore from '@react-native-firebase/firestore';

export function getTagByName(name, limit = 5) {
  return firestore()
    .collection('tags')
    .orderBy('name')
    .startAt(name.toLowerCase())
    .endAt(name.toLowerCase() + '~')
    .limit(limit)
    .get();
}
