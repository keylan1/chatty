import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  console.log('Received color:', color);
  return (
    <View
      style={[styles.container, { backgroundColor: color.backgroundColor }]}>
      <Text style={styles.text}>Hello {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

export default Chat;
