import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { useEffect, useState } from 'react';

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { name, color } = route.params;
  //GiftedChat onSend function
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
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

  //The format and info the GiftedChat msgs require.
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello dev',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      //System message
      {
        _id: 2,
        text: 'User has entered the chat',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  //for the username to be in the title
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

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
          _id: 1,
        }}
      />
      {/*      <Text style={styles.text}>Hello {name}!</Text>*/}
      {/*      Forr android phones particularly so that the keyboard doesn't hide what has already been typed*/}
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
