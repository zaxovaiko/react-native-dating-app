import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {GiftedChat} from 'react-native-gifted-chat';
import {firebase} from '@react-native-firebase/firestore';

const db = firebase.firestore();
const _id = Math.random().toString(36).substring(7);
const user = {_id};
const chatsRef = db.collection('chats');

export default function Chat({onBack, selectedUser}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //readUser();
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const message = doc.data();
          return {...message, createdAt: message.createdAt.toDate()};
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [messages],
  );

  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }

  return (
    <>
      <Appbar.Header dark={false} style={styles.transparentHeader}>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title={selectedUser?.name} />
      </Appbar.Header>
      <GiftedChat messages={messages} user={user} onSend={handleSend} />
    </>
  );
}

const styles = StyleSheet.create({
  transparentHeader: {
    backgroundColor: '#fff',
    borderColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
});
