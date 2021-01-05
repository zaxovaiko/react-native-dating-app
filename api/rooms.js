import firestore from '@react-native-firebase/firestore';

export function createRoom(_name, _topic, _tags) {
    return firestore().collection('rooms').add({
      name: _name,
      rid: Math.random().toString(36).substring(7),
      topic: _topic,
      tags: _tags
    })
    .then(() => {
        console.log('Room added!');
      });
  }