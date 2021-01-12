import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useHistory} from 'react-router-dom';
import firestore from '@react-native-firebase/firestore';
import {getUserById} from '../../api/user';
import LightHeader from '../layouts/LightHeader';
import AppContext from '../../contexts/AppContext';

let docId;

export default function Chat({match}) {
  const history = useHistory();
  const {user} = useContext(AppContext);

  const [init, setInit] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [part, setPart] = useState(false);

  useEffect(() => {
    let sub = () => {};
    (async () => {
      try {
        const cu = await getUserById(user.uid);
        setCurrentUser(cu);

        const par = await getUserById(match.params.uid);
        setPart(par);

        const id =
          user.uid > match.params.uid
            ? `${user.uid}_${match.params.uid}`
            : `${match.params.uid}_${user.uid}`;

        const docs = await firestore()
          .collection('chats')
          .where('ids', '==', id)
          .get();

        if (docs.docs.length === 0) {
          const docRef = await firestore()
            .collection('chats')
            .add({
              ids: id,
              aids: [match.params.uid, user.uid],
            });
          docId = docRef.id;
        } else {
          docId = docs.docs[0].id;
        }

        sub = firestore()
          .collection('chats')
          .doc(docs.docs[0].id)
          .collection('messages')
          .orderBy('createdAt', 'desc')
          .onSnapshot((res) => {
            setMessages(res.docs.map((e) => e.data()));
          });

        setInit(true);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => sub();
  }, []);

  const onSend = useCallback((messages = []) => {
    firestore()
      .collection('chats')
      .doc(docId)
      .collection('messages')
      .add({
        ...messages[0],
        createdAt: Date.now(),
      })
      .catch((err) => console.log(err));

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  if (!init) {
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <LightHeader title={`${part.name}`} />
      <GiftedChat
        showAvatarForEveryMessage={false}
        onPressAvatar={() => {
          history.push(`/profile/${match.params.uid}`);
        }}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: currentUser.uid,
          name: currentUser.name,
          avatar: currentUser.picture,
        }}
      />
    </View>
  );
}
