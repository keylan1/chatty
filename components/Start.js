import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
} from 'react-native';
import { useState } from 'react';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  const image = require('../assets/BackgroundImage.png');
  //const onChangeText = () => {};

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.appTitle}>App Title</Text>
        <View>
          <Text>Hello!</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
          />
          <Text>Choose Background Color:</Text>
          <Button
            title="Go to Chat"
            onPress={() => navigation.navigate('Chat', { name: name })}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 45,
    fontWeight: 600,
    color: '#FFFFFF',
  },
  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default Start;
