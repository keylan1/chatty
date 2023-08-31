import { StyleSheet, Text, View } from 'react-native';
//import screens
import Start from './components/Start';
import Chat from './components/Chat';
//import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';
import { LogBox, Alert } from 'react-native';
import { useEffect } from 'react';

//create navigator
const Stack = createNativeStackNavigator();

export default function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyCeciQtSSA0HwwbUuxvDV8i_cwN21dIeyY',
    authDomain: 'chirpapp-9d42c.firebaseapp.com',
    projectId: 'chirpapp-9d42c',
    storageBucket: 'chirpapp-9d42c.appspot.com',
    messagingSenderId: '965502189722',
    appId: '1:965502189722:web:c055ed67856926a6549f23',
    measurementId: 'G-Q2ZGT9HL7P',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service (for the database)
  const db = getFirestore(app);

  //network connectivity status state setup
  const connectionStatus = useNetInfo();

  //monitors connection status and disables or enables based on that.
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
