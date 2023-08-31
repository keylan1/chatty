import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation, db, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const { name, color, userID } = route.params;

  //not sure why these are printing twice
  console.log('userID', userID);
  console.log('name', name);

  //async function to load cached list from storage to be used in useEffect
  // if load fails, then initialize []
  const loadCachedMsgs = async () => {
    const cachedMsgs = (await AsyncStorage.getItem('messages')) || [];
  };

  // declare outside useEffect so reference is preserved and old listener can be removed
  let unsubMessages;

  //The format and info the GiftedChat msgs require.
  useEffect(() => {
    //name at top of chat
    navigation.setOptions({ title: name });
    //if connected, do normal thing from db
    if (isConnected === true) {
      // unregister currenct listener on snapshot() to avoid registering multiples/memory leaks
      //useEffect code is re-executed
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      //read from db
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessages = onSnapshot(q, (documentSnapshot) => {
        let newMessages = [];
        documentSnapshot.forEach((msg) => {
          const obj = msg.data();
          newMessages.push({
            _id: msg.id,
            ...obj,
            createdAt: obj.createdAt.toDate(),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
      // else get from AsyncStorage
    } else loadCachedMsgs();
    //clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }; //useEffect needs to refresh whenever there is a connection change
  }, [isConnected]);

  //whatever messagse are loaded in the useEffect on connection, store them in the cache
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  //customizing UI chat with renderBubble (custom message bubble), given a new wrapperstyle, right sender
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  //GiftedChat onSend function
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  //for the username to be in the title
  /* useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);*/

  //console.log('Received color:', color);
  return (
    <View
      style={[styles.container, { backgroundColor: color.backgroundColor }]}>
      {/*Component with necessary props to send messages*/}
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {/*      <Text style={styles.text}>Hello {name}!</Text>*/}
      {/*      For android phones particularly so that the keyboard doesn't hide what has already been typed*/}
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
  },
});

export default Chat;
