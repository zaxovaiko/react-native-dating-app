import firestore from '@react-native-firebase/firestore';
import locationHelper from '../helpers/location';

export function getNearbyUsers(gender, location, distance = 60) {
  const {lower, upper} = locationHelper(location, distance);

  let ref = firestore()
    .collection('users')
    .where('location.geohash', '>=', lower)
    .where('location.geohash', '<=', upper);

  if (gender !== 2) {
    ref = ref.where('gender', '==', gender);
  }

  return ref.get().then((docs) => {
    if (docs.docs.length === 0) {
      throw new Error('Nearby users were not found.');
    }
    return docs.docs.map((e) => e.data());
  });
}
