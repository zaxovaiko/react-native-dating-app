import * as geofire from 'geofire-common';

export default function ({longitude, latitude}, distance = 200) {
  const lat = 0.0144927536231884;
  const lon = 0.0181818181818182;

  const lowerLat = latitude - lat * distance;
  const upperLat = latitude + lat * distance;
  const lowerLon = longitude - lon * distance;
  const upperLon = longitude + lon * distance;
  const lower = geofire.geohashForLocation([lowerLat, lowerLon]);
  const upper = geofire.geohashForLocation([upperLat, upperLon]);

  return {lower, upper};
}
