import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useState } from 'react';
import { SvgUri } from 'react-native-svg';

const bgColors = {
  black: { backgroundColor: '#090C08' },
  purple: { backgroundColor: '#474056' },
  blue: { backgroundColor: '#8A95A5' },
  green: { backgroundColor: '#B9C6AE' },
};

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(bgColors.black);

  const image = require('../assets/BackgroundImage.png');
  const icon = require('../assets/icon.svg');
  //const onChangeText = () => {};

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.appTitle}>Chirp</Text>
        <KeyboardAvoidingView
          style={[styles.inputContainer, styles.whiteBox]}
          behavior="padding">
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            placeholderTextColor="rgba(117, 128, 131, 0.5)"
          />
          <Text style={styles.bgColor}>Choose Background Color:</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity
              style={[styles.circle, bgColors.black]}
              onPress={() => {
                //console.log('Selected color:', bgColors.black.backgroundColor);
                setColor(bgColors.black);
              }}></TouchableOpacity>
            <TouchableOpacity
              style={[styles.circle, bgColors.purple]}
              onPress={() => setColor(bgColors.purple)}></TouchableOpacity>
            <TouchableOpacity
              style={[styles.circle, bgColors.blue]}
              onPress={() => setColor(bgColors.blue)}></TouchableOpacity>

            <TouchableOpacity
              style={[styles.circle, bgColors.green]}
              onPress={() => setColor(bgColors.green)}></TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, { display: 'flex' }]}
            onPress={() =>
              navigation.navigate('Chat', {
                name: name,
                color: color,
              })
            }>
            <Text>Go chat</Text>
          </TouchableOpacity>
          {Platform.OS === 'ios' ? (
            <KeyboardAvoidingView behavior="padding" />
          ) : null}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  appTitle: {
    flex: 2,
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  yourName: {
    fontSize: 16,
    fontWeight: '300',
    color: 'rgba(117, 128, 131, 0.5)',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '300',
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'center',
    color: '#757083',
    borderColor: '#757083',
  },
  bgColor: {
    fontSize: 16,
    fontWeight: '300',
    color: 'rgba(117, 128, 131, 1)',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
  },
  whiteBox: {
    flex: 1,
    backgroundColor: 'white',
    width: '88%',
    height: '44%',
    alignItems: 'center',
    margin: 25,
    alignSelf: 'center',
    padding: 15,
  },
  colorContainer: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    //flexWrap: 'wrap',
  },
  button: {
    fontSize: 16,
    width: '88%',
    height: 45,
    fontWeight: '600',
    color: '#FFFFFF,',
    backgroundColor: '#757083',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  /*inputContainer: {
    //flex: 1,
    backgroundColor: '#0000000',
    padding: '6%',
  },*/
  wrap: {},
  icon: {
    marginRight: 10,
  },
});

export default Start;
