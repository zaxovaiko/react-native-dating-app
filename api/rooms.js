import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {getInfoByUserId, getUserById} from './user';

var user = auth().currentUser;

export function createRoom(_name, _topic, _tags, _roomId) {
  return firestore()
    .collection('rooms')
    .add({
      name: _name,
      rid: _roomId,
      users: [user.uid],
      topic: _topic,
      tags: _tags,
    })
    .then(
      getInfoByUserId(user.uid).then((doc) => {
        return firestore()
          .collection('users')
          .doc(doc.id)
          .update({
            rooms: firestore.FieldValue.arrayUnion(_roomId),
          });
      }),
    )
    .then(() => {
      console.log('Room added!');
    });
}

function getInfoByRoomName(rid) {
  return firestore()
    .collection('rooms')
    .where('rid', '==', rid)
    .limit(1)
    .get()
    .then((res) => {
      if (res.docs.length === 0) {
        throw new Error('Room was not found');
      }
      return res.docs[0];
    });
}

export function exitRoom(roomId) {
  var user = auth().currentUser;
  return getInfoByRoomName(roomId)
    .then((doc) => {
      return firestore()
        .collection('rooms')
        .doc(doc.id)
        .update({
          users: firestore.FieldValue.arrayRemove('', user.uid),
        });
    })
    .then(() => {
      console.log('Exit');
    });
}
