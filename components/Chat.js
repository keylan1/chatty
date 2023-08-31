import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
  const [messages, setMessages] = useState([]);
  const { name, color, userID } = route.params;

  //not sure why these are printing twice
  console.log('userID', userID);
  console.log('name', name);

  //The format and info the GiftedChat msgs require.
  useEffect(() => {
    //name at top of chat
    navigation.setOptions({ title: name });

    //read from db
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (documentSnapshot) => {
      let newMessages = [];
      documentSnapshot.forEach((msg) => {
        const obj = msg.data();
        newMessages.push({
          _id: msg.id,
          ...obj,
          createdAt: obj.createdAt.toDate(),
        });
      });
      setMessages(newMessages);
    });
    //clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

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
