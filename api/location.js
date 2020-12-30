import firestore from '@react-native-firebase/firestore';
import locationHelper from '../helpers/location.helper';

export function getNearbyUsers(location, distance = 60) {
  const {lower, upper} = locationHelper(location, distance);

  return firestore()
    .collection('users')
    .where('location.geohash', '>=', lower)
    .where('location.geohash', '<=', upper)
    .get()
    .then((docs) => {
      if (docs.docs.length === 0) {
        throw new Error('Nearby users were not found.');
      }
      return docs.docs.map((e) => e.data());
    });
}
