import geohash from 'ngeohash';
import firestore from '@react-native-firebase/firestore';

const getGeohashRange = (latitude, longitude, distance) => {
  const lat = 0.0144927536231884;
  const lon = 0.0181818181818182;

  const lowerLat = latitude - lat * distance;
  const upperLat = latitude + lat * distance;

  const lowerLon = longitude - lon * distance;
  const upperLon = longitude + lon * distance;

  const lower = geohash.encode(lowerLat, lowerLon);
  const upper = geohash.encode(upperLat, upperLon);

  return {lower, upper};
};

export function getNearbyUsers(position, distance = 10) {
  const {longitude, latitude} = position;
  const range = getGeohashRange(latitude, longitude, distance);

  return firestore()
    .collection('users')
    .where('geohash', '>=', range.lower)
    .where('geohash', '<=', range.upper)
    .get()
    .then((docs) => {
      if (docs.docs.length === 0) {
        throw new Error('Nearby users were not found.');
      }
      return docs.docs.map((e) => e.data());
    });
}
